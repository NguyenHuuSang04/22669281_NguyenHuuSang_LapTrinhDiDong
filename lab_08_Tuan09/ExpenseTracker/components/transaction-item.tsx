import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Transaction } from '@/types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
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

  const handlePress = () => {
    router.push(`/edit-transaction?id=${transaction.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  incomeIndicator: {
    backgroundColor: '#E8F5E8',
  },
  expenseIndicator: {
    backgroundColor: '#FFEBEE',
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
});