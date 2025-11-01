import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '@/components/transaction-item';
import { Transaction } from '@/types/transaction';

export default function HomeScreen() {
  // Sample data để demo Transaction Items
  const sampleTransactions: Transaction[] = [
    {
      id: '1',
      title: 'Lương tháng 11',
      amount: 15000000,
      createdAt: new Date('2024-11-01T08:00:00'),
      type: 'income',
      category: 'Lương'
    },
    {
      id: '2',
      title: 'Mua sắm siêu thị',
      amount: 500000,
      createdAt: new Date('2024-11-01T10:30:00'),
      type: 'expense',
      category: 'Thực phẩm'
    },
    {
      id: '3',
      title: 'Tiền điện tháng 10',
      amount: 350000,
      createdAt: new Date('2024-10-31T15:20:00'),
      type: 'expense',
      category: 'Hóa đơn'
    },
    {
      id: '4',
      title: 'Bán đồ cũ',
      amount: 1200000,
      createdAt: new Date('2024-10-30T14:15:00'),
      type: 'income',
      category: 'Khác'
    }
  ];

  // Tính toán tổng thu chi
  const totalIncome = sampleTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = sampleTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  // Format tiền tệ
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Tổng quan tài chính</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thu nhập</Text>
              <Text style={[styles.summaryValue, styles.incomeText]}>
                {formatAmount(totalIncome)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Chi tiêu</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>
                {formatAmount(totalExpense)}
              </Text>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Số dư</Text>
            <Text style={[styles.balanceValue, styles.balanceText]}>
              {formatAmount(balance)}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>+ Thu nhập</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>- Chi tiêu</Text>
          </View>
        </View>

        <View style={styles.recentTransactions}>
          <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
          {sampleTransactions.length > 0 ? (
            <View style={styles.transactionsList}>
              {sampleTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
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
  },
});
