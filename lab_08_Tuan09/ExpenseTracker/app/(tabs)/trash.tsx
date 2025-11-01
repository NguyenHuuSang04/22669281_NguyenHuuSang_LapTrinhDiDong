import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '@/components/search-bar';
import TransactionFilter, { FilterType } from '@/components/transaction-filter';
import { Transaction } from '@/types/transaction';
import { getDeletedTransactions, restoreTransaction, deleteTransaction, searchDeletedTransactions } from '@/lib/database';

interface TrashItemProps {
  transaction: Transaction;
  onRestored: () => void;
  onPermanentlyDeleted: () => void;
}

function TrashItem({ transaction, onRestored, onPermanentlyDeleted }: TrashItemProps) {
  const { id, title, amount, type, createdAt } = transaction;

  // Format date to Vietnamese format
  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  };

  // Format amount to Vietnamese currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const isIncome = type === 'income';

  const handleLongPress = () => {
    Alert.alert(
      'Tùy chọn',
      `Chọn hành động cho "${title}"`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Khôi phục',
          onPress: handleRestore,
        },
        {
          text: 'Xóa vĩnh viễn',
          style: 'destructive',
          onPress: handlePermanentDelete,
        },
      ]
    );
  };

  const handleRestore = () => {
    try {
      restoreTransaction(transaction.id);
      onRestored();
      Alert.alert('Thành công', 'Giao dịch đã được khôi phục.');
    } catch (error) {
      console.error('Error restoring transaction:', error);
      Alert.alert('Lỗi', 'Không thể khôi phục giao dịch.');
    }
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
    <TouchableOpacity style={styles.trashItem} onLongPress={handleLongPress}>
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
            <Text style={styles.longPressHint}>Chạm lâu để xem tùy chọn</Text>
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
    </TouchableOpacity>
  );
}

export default function TrashScreen() {
  const [deletedTransactions, setDeletedTransactions] = useState<Transaction[]>([]);
  const [allDeletedTransactions, setAllDeletedTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // Load data khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    try {
      const data = getDeletedTransactions();
      setAllDeletedTransactions(data);
      setDeletedTransactions(data);
    } catch (error) {
      console.error('Error loading deleted transactions:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập quá trình refresh
    loadData();
    setIsRefreshing(false);
  }, []);

  // Filter transactions by type
  const applyFilter = useCallback((transactionList: Transaction[]) => {
    if (selectedFilter === 'all') {
      return transactionList;
    }
    return transactionList.filter(transaction => transaction.type === selectedFilter);
  }, [selectedFilter]);

  // Handle filter change
  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  // Effect để filter transactions khi search term hoặc filter thay đổi
  useEffect(() => {
    let filteredTransactions: Transaction[];
    
    if (searchTerm.trim() === '') {
      filteredTransactions = applyFilter(allDeletedTransactions);
    } else {
      const searchResults = searchDeletedTransactions(searchTerm);
      filteredTransactions = applyFilter(searchResults);
    }
    
    setDeletedTransactions(filteredTransactions);
  }, [searchTerm, allDeletedTransactions, applyFilter]);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
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
        {allDeletedTransactions.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {allDeletedTransactions.length > 0 && (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            placeholder="Tìm kiếm trong thùng rác..."
            backgroundColor="#f5f5f5"
          />
          
          <TransactionFilter
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </>
      )}
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#FF0000']} // Android color - đỏ đậm
            tintColor="#FF0000" // iOS color - đỏ đậm
          />
        }
      >
        {deletedTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🗑️</Text>
            <Text style={styles.emptyText}>
              {searchTerm ? 'Không tìm thấy giao dịch' : 'Thùng rác trống'}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchTerm 
                ? 'Thử với từ khóa khác' 
                : 'Các giao dịch đã xóa sẽ xuất hiện ở đây'}
            </Text>
          </View>
        ) : (
          <>
            {deletedTransactions.map((transaction) => (
              <TrashItem
                key={transaction.id}
                transaction={transaction}
                onRestored={loadData}
                onPermanentlyDeleted={loadData}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  trashItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 4,
    borderLeftColor: '#795548',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  longPressHint: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 2,
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
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  incomeType: {
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
  },
  expenseType: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
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
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});