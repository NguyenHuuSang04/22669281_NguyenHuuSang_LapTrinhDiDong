import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type FilterType = 'all' | 'income' | 'expense';

interface TransactionFilterProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TransactionFilter({ selectedFilter, onFilterChange }: TransactionFilterProps) {
  const filters = [
    { key: 'all' as FilterType, label: 'Tất cả', icon: '📊' },
    { key: 'income' as FilterType, label: 'Thu', icon: '💰' },
    { key: 'expense' as FilterType, label: 'Chi', icon: '💸' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phân loại:</Text>
      <View style={styles.filterButtons}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text style={styles.filterIcon}>{filter.icon}</Text>
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
});