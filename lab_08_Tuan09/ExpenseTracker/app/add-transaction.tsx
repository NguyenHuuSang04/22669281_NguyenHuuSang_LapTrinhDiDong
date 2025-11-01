import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TransactionType } from '@/types/transaction';
import { insertTransaction } from '@/lib/database';

export default function AddTransactionScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useRef để clear form
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  // Categories cho income và expense
  const incomeCategories = ['Lương', 'Thưởng', 'Bán hàng', 'Đầu tư', 'Khác'];
  const expenseCategories = ['Thực phẩm', 'Di chuyển', 'Giải trí', 'Hóa đơn', 'Mua sắm', 'Y tế', 'Khác'];

  const getCurrentCategories = () => {
    return type === 'income' ? incomeCategories : expenseCategories;
  };

  const clearForm = () => {
    setTitle('');
    setAmount('');
    setCategory('');
    setDescription('');
    
    // Clear using refs
    titleRef.current?.clear();
    amountRef.current?.clear();
    categoryRef.current?.clear();
    descriptionRef.current?.clear();
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên giao dịch');
      return;
    }

    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Lỗi', 'Vui lòng chọn danh mục');
      return;
    }

    setIsLoading(true);

    try {
      const newTransaction = {
        title: title.trim(),
        amount: Number(amount),
        type,
        category: category.trim(),
        description: description.trim(),
        createdAt: new Date()
      };

      insertTransaction(newTransaction);
      
      Alert.alert(
        'Thành công',
        'Giao dịch đã được lưu!',
        [
          {
            text: 'OK',
            onPress: () => {
              clearForm();
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Lỗi', 'Không thể lưu giao dịch. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Thêm giao dịch</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Transaction Type Selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'expense' && styles.activeExpenseButton]}
              onPress={() => setType('expense')}
            >
              <Text style={[styles.typeButtonText, type === 'expense' && styles.activeExpenseText]}>
                Chi tiêu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, type === 'income' && styles.activeIncomeButton]}
              onPress={() => setType('income')}
            >
              <Text style={[styles.typeButtonText, type === 'income' && styles.activeIncomeText]}>
                Thu nhập
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Tên giao dịch *</Text>
              <TextInput
                ref={titleRef}
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Nhập tên giao dịch..."
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Số tiền *</Text>
              <TextInput
                ref={amountRef}
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Danh mục *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {getCurrentCategories().map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChip, category === cat && styles.activeCategoryChip]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[styles.categoryText, category === cat && styles.activeCategoryText]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                ref={descriptionRef}
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Thêm ghi chú..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Đang lưu...' : 'Lưu giao dịch'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 80,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeExpenseButton: {
    backgroundColor: '#F44336',
  },
  activeIncomeButton: {
    backgroundColor: '#4CAF50',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeExpenseText: {
    color: '#fff',
  },
  activeIncomeText: {
    color: '#fff',
  },
  formContainer: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});