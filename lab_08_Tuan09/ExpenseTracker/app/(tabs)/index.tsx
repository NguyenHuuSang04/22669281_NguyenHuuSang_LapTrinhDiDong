import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import TransactionItem from '@/components/transaction-item';
import SearchBar from '@/components/search-bar';
import { Transaction } from '@/types/transaction';
import { getAllTransactions, getTransactionSummary, initializeDatabase, searchTransactions } from '@/lib/database';

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize database khi component mount
  useEffect(() => {
    initializeDatabase();
    loadData();
  }, []);

  // Reload data khi màn hình được focus (sau khi thêm transaction mới)
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const performSearch = React.useCallback(() => {
    try {
      const searchResults = searchTransactions(searchTerm);
      setTransactions(searchResults);
    } catch (error) {
      console.error('Error searching transactions:', error);
    }
  }, [searchTerm]);

  // Effect để filter transactions khi search term thay đổi
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setTransactions(allTransactions);
    } else {
      performSearch();
    }
  }, [searchTerm, allTransactions, performSearch]);

  const loadData = () => {
    try {
      const transactionsData = getAllTransactions();
      const summaryData = getTransactionSummary();
      
      setAllTransactions(transactionsData);
      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reload data from database
      loadData();
      
      // Clear search if active to show all refreshed data
      if (searchTerm) {
        setSearchTerm('');
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [searchTerm]);

  // Format tiền tệ
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleAddTransaction = (type: 'income' | 'expense') => {
    router.push('/add-transaction');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        placeholder="Tìm kiếm giao dịch..."
        backgroundColor="#f5f5f5"
      />
      
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
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Tổng quan tài chính</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thu nhập</Text>
              <Text style={[styles.summaryValue, styles.incomeText]}>
                {formatAmount(summary.totalIncome)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Chi tiêu</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>
                {formatAmount(summary.totalExpense)}
              </Text>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Số dư</Text>
            <Text style={[styles.balanceValue, styles.balanceText]}>
              {formatAmount(summary.balance)}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.incomeButton]}
            onPress={() => handleAddTransaction('income')}
          >
            <Text style={styles.actionButtonText}>+ Thu nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.expenseButton]}
            onPress={() => handleAddTransaction('expense')}
          >
            <Text style={styles.actionButtonText}>- Chi tiêu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentTransactions}>
          <Text style={styles.sectionTitle}>
            {searchTerm ? `Kết quả tìm kiếm "${searchTerm}"` : 'Giao dịch gần đây'}
          </Text>
          {transactions.length > 0 ? (
            <View style={styles.transactionsList}>
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onDeleted={loadData}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              {searchTerm ? (
                <>
                  <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
                  <Text style={styles.emptySubText}>Thử từ khóa khác hoặc xóa bộ lọc</Text>
                </>
              ) : (
                <>
                  <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
                  <Text style={styles.emptySubText}>Nhấn nút + để thêm giao dịch đầu tiên</Text>
                </>
              )}
            </View>
          )}
        </View>
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
    backgroundColor: '#2196F3',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#F44336',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceText: {
    color: '#2196F3',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  incomeButton: {
    backgroundColor: '#4CAF50',
  },
  expenseButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recentTransactions: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginHorizontal: 16,
  },
  transactionsList: {
    paddingBottom: 20,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginHorizontal: 16,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});
