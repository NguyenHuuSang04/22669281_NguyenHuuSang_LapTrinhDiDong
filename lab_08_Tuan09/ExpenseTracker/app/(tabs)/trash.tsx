import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Transaction } from '@/types/transaction';
import { getDeletedTransactions, restoreTransaction, deleteTransaction } from '@/lib/database';

interface TrashItemProps {
  transaction: Transaction;
  onRestored: () => void;
  onPermanentlyDeleted: () => void;
}

function TrashItem({ transaction, onRestored, onPermanentlyDeleted }: TrashItemProps) {
  const { title, amount, createdAt, type } = transaction;

  // Format date to Vietnamese format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format amount to Vietnamese currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const isIncome = type === 'income';

  const handleRestore = () => {
    Alert.alert(
      'Khôi phục giao dịch',
      `Bạn có muốn khôi phục "${title}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Khôi phục',
          onPress: async () => {
            try {
              restoreTransaction(transaction.id);
              onRestored();
              Alert.alert('Thành công', 'Giao dịch đã được khôi phục.');
            } catch (error) {
              console.error('Error restoring transaction:', error);
              Alert.alert('Lỗi', 'Không thể khôi phục giao dịch.');
            }
          },
        },
      ]
    );
  };

  const handlePermanentDelete = () => {
    Alert.alert(
      'Xóa vĩnh viễn',
      `Bạn có chắc chắn muốn xóa vĩnh viễn "${title}"?\nHành động này không thể hoàn tác!`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa vĩnh viễn',
          style: 'destructive',
          onPress: async () => {
            try {
              deleteTransaction(transaction.id);
              onPermanentlyDeleted();
              Alert.alert('Thành công', 'Giao dịch đã được xóa vĩnh viễn.');
            } catch (error) {
              console.error('Error permanently deleting transaction:', error);
              Alert.alert('Lỗi', 'Không thể xóa giao dịch.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.trashItem}>
      <View style={styles.itemContent}>
        <View style={styles.leftSection}>
          <View style={[styles.typeIndicator, isIncome ? styles.incomeIndicator : styles.expenseIndicator]}>
            <Text style={[styles.typeIcon, isIncome ? styles.incomeIcon : styles.expenseIcon]}>
              {isIncome ? '+' : '-'}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.date}>{formatDate(createdAt)}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={[styles.amount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
            {formatAmount(amount)}
          </Text>
          <Text style={[styles.typeLabel, isIncome ? styles.incomeType : styles.expenseType]}>
            {isIncome ? 'Thu nhập' : 'Chi tiêu'}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreButtonText}>Khôi phục</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handlePermanentDelete}>
          <Text style={styles.deleteButtonText}>Xóa vĩnh viễn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TrashScreen() {
  const [deletedTransactions, setDeletedTransactions] = useState<Transaction[]>([]);

  // Load data khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    try {
      const data = getDeletedTransactions();
      setDeletedTransactions(data);
    } catch (error) {
      console.error('Error loading deleted transactions:', error);
    }
  };

  const handleClearAll = () => {
    if (deletedTransactions.length === 0) {
      Alert.alert('Thông báo', 'Thùng rác đã trống.');
      return;
    }

    Alert.alert(
      'Xóa tất cả',
      'Bạn có chắc chắn muốn xóa vĩnh viễn tất cả giao dịch trong thùng rác?\nHành động này không thể hoàn tác!',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const transaction of deletedTransactions) {
                deleteTransaction(transaction.id);
              }
              loadData();
              Alert.alert('Thành công', 'Đã xóa vĩnh viễn tất cả giao dịch.');
            } catch (error) {
              console.error('Error clearing trash:', error);
              Alert.alert('Lỗi', 'Không thể xóa tất cả giao dịch.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thùng rác</Text>
        {deletedTransactions.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        {deletedTransactions.length > 0 ? (
          <View style={styles.transactionsList}>
            {deletedTransactions.map((transaction) => (
              <TrashItem
                key={transaction.id}
                transaction={transaction}
                onRestored={loadData}
                onPermanentlyDeleted={loadData}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🗑️</Text>
            <Text style={styles.emptyText}>Thùng rác trống</Text>
            <Text style={styles.emptySubText}>Các giao dịch đã xóa sẽ xuất hiện ở đây</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#795548',
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearAllButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  transactionsList: {
    gap: 12,
  },
  trashItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#795548',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIndicator: {
    backgroundColor: '#E8F5E8',
  },
  expenseIndicator: {
    backgroundColor: '#FFEBEE',
  },
  typeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  incomeIcon: {
    color: '#4CAF50',
  },
  expenseIcon: {
    color: '#F44336',
  },
  infoSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  expenseAmount: {
    color: '#F44336',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  incomeType: {
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
  },
  expenseType: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  restoreButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});