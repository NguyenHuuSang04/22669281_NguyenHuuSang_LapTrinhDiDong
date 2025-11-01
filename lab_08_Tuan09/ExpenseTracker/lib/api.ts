import { Transaction } from '@/types/transaction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_API_URL = 'https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/Expense';
const API_URL_STORAGE_KEY = 'expense_api_url';

// Get stored API URL or use default
export const getApiUrl = async (): Promise<string> => {
    try {
        const storedUrl = await AsyncStorage.getItem(API_URL_STORAGE_KEY);
        return storedUrl || DEFAULT_API_URL;
    } catch (error) {
        console.error('Error getting API URL:', error);
        return DEFAULT_API_URL;
    }
};

// Store custom API URL
export const setApiUrl = async (url: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(API_URL_STORAGE_KEY, url);
    } catch (error) {
        console.error('Error storing API URL:', error);
        throw error;
    }
};

// Validate API URL format
export const validateApiUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:' && urlObj.hostname.includes('mockapi.io');
    } catch {
        return false;
    }
};

// Transform local transaction to API format
const transformToApiFormat = (transaction: Transaction) => {
    return {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category || 'other',
        description: transaction.description || '',
        createdAt: transaction.createdAt instanceof Date ? transaction.createdAt.toISOString() : transaction.createdAt,
        updatedAt: transaction.updatedAt instanceof Date ? transaction.updatedAt.toISOString() : (transaction.updatedAt || transaction.createdAt),
    };
};// Get all data from API
export const getAllApiData = async (): Promise<any[]> => {
    try {
        const apiUrl = await getApiUrl();
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching API data:', error);
        throw error;
    }
};

// Clear all data in API
export const clearAllApiData = async (): Promise<void> => {
    try {
        const data = await getAllApiData();
        const apiUrl = await getApiUrl();

        // Delete each item individually
        const deletePromises = data.map(async (item) => {
            const deleteResponse = await fetch(`${apiUrl}/${item.id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error(`Failed to delete item ${item.id}`);
            }
        });

        await Promise.all(deletePromises);
    } catch (error) {
        console.error('Error clearing API data:', error);
        throw error;
    }
};

// Upload single transaction to API
const uploadTransaction = async (transaction: Transaction): Promise<void> => {
    try {
        const apiUrl = await getApiUrl();
        const apiTransaction = transformToApiFormat(transaction);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiTransaction),
        });

        if (!response.ok) {
            throw new Error(`Failed to upload transaction ${transaction.id}`);
        }
    } catch (error) {
        console.error('Error uploading transaction:', error);
        throw error;
    }
};

// Upload all local transactions to API
export const uploadAllTransactions = async (transactions: Transaction[]): Promise<void> => {
    try {
        // Filter out deleted transactions (only sync active ones)
        const activeTransactions = transactions.filter(t => !t.deleted);

        // Upload transactions in batches to avoid overwhelming the API
        const batchSize = 5;
        for (let i = 0; i < activeTransactions.length; i += batchSize) {
            const batch = activeTransactions.slice(i, i + batchSize);
            const uploadPromises = batch.map(uploadTransaction);
            await Promise.all(uploadPromises);

            // Small delay between batches
            if (i + batchSize < activeTransactions.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    } catch (error) {
        console.error('Error uploading all transactions:', error);
        throw error;
    }
};

// Main sync function: clear API and upload all local data
export const syncToApi = async (transactions: Transaction[]): Promise<void> => {
    try {
        console.log('Starting sync process...');

        // Step 1: Clear all existing data in API
        console.log('Clearing existing API data...');
        await clearAllApiData();

        // Step 2: Upload all local transactions
        console.log('Uploading local transactions...');
        await uploadAllTransactions(transactions);

        console.log('Sync completed successfully!');
    } catch (error) {
        console.error('Sync failed:', error);
        throw error;
    }
};

// Test API connection
export const testApiConnection = async (): Promise<boolean> => {
    try {
        const apiUrl = await getApiUrl();
        const response = await fetch(apiUrl, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('API connection test failed:', error);
        return false;
    }
};