import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { getMonthlyStats, getYearlyStats, MonthlyStats, YearlyStats } from '@/lib/database';

const screenWidth = Dimensions.get('window').width;

type ViewType = 'monthly' | 'yearly';

export default function StatisticsScreen() {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [yearlyStats, setYearlyStats] = useState<YearlyStats[]>([]);
  const [viewType, setViewType] = useState<ViewType>('monthly');

  // Load data when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = () => {
    try {
      const monthly = getMonthlyStats(6); // Last 6 months
      const yearly = getYearlyStats(3);   // Last 3 years
      setMonthlyStats(monthly);
      setYearlyStats(yearly);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  // Format currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format amount for chart (in millions)
  const formatChartAmount = (amount: number) => {
    return Math.round(amount / 1000000); // Convert to millions
  };

  // Prepare monthly chart data
  const getMonthlyChartData = () => {
    if (monthlyStats.length === 0) {
      return {
        labels: ['Không có dữ liệu'],
        datasets: [
          {
            data: [0],
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          },
        ],
      };
    }

    return {
      labels: monthlyStats.map(stat => `${stat.month}`),
      datasets: [
        {
          data: monthlyStats.map(stat => formatChartAmount(stat.income)),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green for income
          strokeWidth: 3,
        },
        {
          data: monthlyStats.map(stat => formatChartAmount(stat.expense)),
          color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Red for expense
          strokeWidth: 3,
        },
      ],
      legend: ['Thu nhập (triệu VNĐ)', 'Chi tiêu (triệu VNĐ)'],
    };
  };

  // Prepare yearly chart data
  const getYearlyChartData = () => {
    if (yearlyStats.length === 0) {
      return {
        labels: ['Không có dữ liệu'],
        datasets: [
          {
            data: [0],
          },
        ],
      };
    }

    return {
      labels: yearlyStats.map(stat => stat.year.toString()),
      datasets: [
        {
          data: yearlyStats.map(stat => formatChartAmount(stat.income)),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        },
        {
          data: yearlyStats.map(stat => formatChartAmount(stat.expense)),
          color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        },
      ],
      legend: ['Thu nhập (triệu VNĐ)', 'Chi tiêu (triệu VNĐ)'],
    };
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  const currentStats = viewType === 'monthly' ? monthlyStats : yearlyStats;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thống kê</Text>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, viewType === 'monthly' && styles.toggleButtonActive]}
          onPress={() => setViewType('monthly')}
        >
          <Text style={[styles.toggleText, viewType === 'monthly' && styles.toggleTextActive]}>
            Theo tháng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewType === 'yearly' && styles.toggleButtonActive]}
          onPress={() => setViewType('yearly')}
        >
          <Text style={[styles.toggleText, viewType === 'yearly' && styles.toggleTextActive]}>
            Theo năm
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>
            Biểu đồ thu chi {viewType === 'monthly' ? '6 tháng' : '3 năm'} gần đây
          </Text>
          
          {currentStats.length > 0 ? (
            <View style={styles.chartWrapper}>
              <BarChart
                data={viewType === 'monthly' ? getMonthlyChartData() : getYearlyChartData()}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                showValuesOnTopOfBars={true}
                fromZero={true}
              />
            </View>
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>Chưa có dữ liệu thống kê</Text>
              <Text style={styles.emptySubText}>Thêm giao dịch để xem biểu đồ</Text>
            </View>
          )}
        </View>

        {/* Statistics Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Chi tiết số liệu</Text>
          
          {currentStats.length > 0 ? (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.periodColumn]}>
                  {viewType === 'monthly' ? 'Tháng' : 'Năm'}
                </Text>
                <Text style={[styles.tableHeaderText, styles.amountColumn]}>Thu nhập</Text>
                <Text style={[styles.tableHeaderText, styles.amountColumn]}>Chi tiêu</Text>
                <Text style={[styles.tableHeaderText, styles.amountColumn]}>Số dư</Text>
              </View>

              {currentStats.map((stat, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.periodColumn]}>
                    {viewType === 'monthly' ? `${stat.month} ${(stat as MonthlyStats).year}` : (stat as YearlyStats).year}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountColumn, styles.incomeText]}>
                    {formatAmount(stat.income)}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountColumn, styles.expenseText]}>
                    {formatAmount(stat.expense)}
                  </Text>
                  <Text style={[
                    styles.tableCell, 
                    styles.amountColumn,
                    stat.balance >= 0 ? styles.positiveBalance : styles.negativeBalance
                  ]}>
                    {formatAmount(stat.balance)}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.emptyTable}>
              <Text style={styles.emptyText}>Chưa có dữ liệu</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#2196F3',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 12,
  },
  emptyChart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
  tableContainer: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  periodColumn: {
    flex: 1.2,
  },
  amountColumn: {
    flex: 1,
  },
  incomeText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  expenseText: {
    color: '#F44336',
    fontWeight: '600',
  },
  positiveBalance: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  negativeBalance: {
    color: '#F44336',
    fontWeight: '600',
  },
  emptyTable: {
    alignItems: 'center',
    paddingVertical: 30,
  },
});