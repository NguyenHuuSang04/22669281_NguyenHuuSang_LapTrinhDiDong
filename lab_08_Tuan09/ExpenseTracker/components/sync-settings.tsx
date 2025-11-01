import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import { getApiUrl, setApiUrl, validateApiUrl, testApiConnection } from '@/lib/api';

interface SyncSettingsProps {
  visible: boolean;
  onClose: () => void;
  onSyncStart: () => void;
}

export default function SyncSettings({ visible, onClose, onSyncStart }: SyncSettingsProps) {
  const [apiUrl, setApiUrlState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    if (visible) {
      loadCurrentApiUrl();
    }
  }, [visible]);

  const loadCurrentApiUrl = async () => {
    try {
      const currentUrl = await getApiUrl();
      setApiUrlState(currentUrl);
    } catch (error) {
      console.error('Error loading API URL:', error);
    }
  };

  const handleSaveApiUrl = async () => {
    if (!apiUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập URL API');
      return;
    }

    if (!validateApiUrl(apiUrl)) {
      Alert.alert(
        'URL không hợp lệ',
        'URL phải là HTTPS và từ MockAPI.io\nVí dụ: https://xxxxx.mockapi.io/api/v1/Expense'
      );
      return;
    }

    try {
      setIsLoading(true);
      await setApiUrl(apiUrl);
      Alert.alert('Thành công', 'Đã lưu URL API mới');
    } catch (error) {
      console.error('Error saving API URL:', error);
      Alert.alert('Lỗi', 'Không thể lưu URL API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!apiUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập URL API');
      return;
    }

    if (!validateApiUrl(apiUrl)) {
      Alert.alert('URL không hợp lệ', 'URL phải là HTTPS và từ MockAPI.io');
      return;
    }

    try {
      setIsTestingConnection(true);
      
      // Save URL temporarily for testing
      const originalUrl = await getApiUrl();
      await setApiUrl(apiUrl);
      
      const isConnected = await testApiConnection();
      
      if (isConnected) {
        Alert.alert('Thành công', 'Kết nối API thành công!');
      } else {
        Alert.alert('Lỗi', 'Không thể kết nối đến API. Vui lòng kiểm tra lại URL.');
        // Restore original URL if test failed
        await setApiUrl(originalUrl);
        setApiUrlState(originalUrl);
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi kiểm tra kết nối');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSync = () => {
    if (!apiUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập URL API trước khi đồng bộ');
      return;
    }

    Alert.alert(
      'Xác nhận đồng bộ',
      'Quá trình đồng bộ sẽ:\n• Xóa toàn bộ dữ liệu trên API\n• Tải lên tất cả giao dịch từ thiết bị\n\nBạn có chắc chắn muốn tiếp tục?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng bộ',
          style: 'default',
          onPress: () => {
            onSyncStart();
            onClose();
          },
        },
      ]
    );
  };

  const openMockApiGuide = () => {
    Linking.openURL('https://mockapi.io/');
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cài đặt đồng bộ</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>URL MockAPI</Text>
            <Text style={styles.sectionDescription}>
              Nhập URL MockAPI của bạn để đồng bộ dữ liệu
            </Text>
            
            <TextInput
              style={styles.input}
              value={apiUrl}
              onChangeText={setApiUrlState}
              placeholder="https://xxxxx.mockapi.io/api/v1/Expense"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.testButton]}
                onPress={handleTestConnection}
                disabled={isTestingConnection}
              >
                {isTestingConnection ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Kiểm tra kết nối</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveApiUrl}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Lưu URL</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hướng dẫn</Text>
            <View style={styles.guideContainer}>
              <Text style={styles.guideStep}>1. Truy cập MockAPI.io và tạo project mới</Text>
              <Text style={styles.guideStep}>2. Tạo resource với tên "Expense"</Text>
              <Text style={styles.guideStep}>3. Sao chép URL và dán vào ô trên</Text>
              <Text style={styles.guideStep}>4. Kiểm tra kết nối và lưu URL</Text>
              
              <TouchableOpacity style={styles.guideButton} onPress={openMockApiGuide}>
                <Text style={styles.guideButtonText}>Mở MockAPI.io</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cấu trúc dữ liệu</Text>
            <View style={styles.dataStructure}>
              <Text style={styles.dataStructureTitle}>Resource: Expense</Text>
              <Text style={styles.dataField}>• id: string</Text>
              <Text style={styles.dataField}>• title: string</Text>
              <Text style={styles.dataField}>• amount: number</Text>
              <Text style={styles.dataField}>• type: string (income/expense)</Text>
              <Text style={styles.dataField}>• category: string</Text>
              <Text style={styles.dataField}>• description: string</Text>
              <Text style={styles.dataField}>• createdAt: string</Text>
              <Text style={styles.dataField}>• updatedAt: string</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
            <Text style={styles.syncButtonText}>🔄 Bắt đầu đồng bộ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#2196F3',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  guideContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  guideStep: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  guideButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  guideButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dataStructure: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  dataStructureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dataField: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  syncButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});