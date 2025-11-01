import * as SQLite from 'expo-sqlite';
import { Transaction } from '@/types/transaction';

const DB_NAME = 'expense_tracker.db';

// Mở database
export const openDatabase = () => {
    return SQLite.openDatabaseSync(DB_NAME);
};

// Tạo bảng transactions
export const createTransactionTable = () => {
    const db = openDatabase();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      created_at TEXT NOT NULL,
      type TEXT NOT NULL,
      category TEXT,
      description TEXT,
      deleted INTEGER DEFAULT 0,
      deleted_at TEXT
    );
  `;

    try {
        db.execSync(createTableQuery);

        // Thêm cột deleted cho database cũ nếu chưa có
        try {
            db.execSync('ALTER TABLE transactions ADD COLUMN deleted INTEGER DEFAULT 0');
        } catch {
            // Cột đã tồn tại, bỏ qua lỗi
        }

        try {
            db.execSync('ALTER TABLE transactions ADD COLUMN deleted_at TEXT');
        } catch {
            // Cột đã tồn tại, bỏ qua lỗi
        }

        console.log('Table transactions created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

// Thêm transaction mới
export const insertTransaction = (transaction: Omit<Transaction, 'id'>): string => {
    const db = openDatabase();
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const insertQuery = `
    INSERT INTO transactions (id, title, amount, created_at, type, category, description)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

    try {
        db.runSync(insertQuery, [
            id,
            transaction.title,
            transaction.amount,
            transaction.createdAt.toISOString(),
            transaction.type,
            transaction.category || null,
            transaction.description || null
        ]);

        console.log('Transaction inserted successfully with id:', id);
        return id;
    } catch (error) {
        console.error('Error inserting transaction:', error);
        throw error;
    }
};

// Lấy tất cả transactions (chưa bị xóa)
export const getAllTransactions = (): Transaction[] => {
    const db = openDatabase();

    const selectQuery = 'SELECT * FROM transactions WHERE deleted = 0 ORDER BY created_at DESC;';

    try {
        const result = db.getAllSync(selectQuery);

        return result.map((row: any) => ({
            id: row.id,
            title: row.title,
            amount: row.amount,
            createdAt: new Date(row.created_at),
            type: row.type,
            category: row.category,
            description: row.description
        }));
    } catch (error) {
        console.error('Error getting transactions:', error);
        return [];
    }
};

// Lấy một transaction theo ID (chưa bị xóa)
export const getTransactionById = (id: string): Transaction | null => {
    const db = openDatabase();

    const selectQuery = 'SELECT * FROM transactions WHERE id = ? AND deleted = 0;';

    try {
        const result = db.getFirstSync(selectQuery, [id]) as any;

        if (!result) {
            return null;
        }

        return {
            id: result.id,
            title: result.title,
            amount: result.amount,
            createdAt: new Date(result.created_at),
            type: result.type,
            category: result.category,
            description: result.description
        };
    } catch (error) {
        console.error('Error getting transaction by id:', error);
        return null;
    }
};

// Cập nhật transaction
export const updateTransaction = (id: string, transaction: Omit<Transaction, 'id'>): void => {
    const db = openDatabase();

    const updateQuery = `
    UPDATE transactions 
    SET title = ?, amount = ?, created_at = ?, type = ?, category = ?, description = ?
    WHERE id = ?;
  `;

    try {
        db.runSync(updateQuery, [
            transaction.title,
            transaction.amount,
            transaction.createdAt.toISOString(),
            transaction.type,
            transaction.category || null,
            transaction.description || null,
            id
        ]);

        console.log('Transaction updated successfully');
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

// Soft delete transaction (đánh dấu là đã xóa)
export const softDeleteTransaction = (id: string): void => {
    const db = openDatabase();

    const updateQuery = 'UPDATE transactions SET deleted = 1, deleted_at = ? WHERE id = ?;';

    try {
        db.runSync(updateQuery, [new Date().toISOString(), id]);
        console.log('Transaction soft deleted successfully');
    } catch (error) {
        console.error('Error soft deleting transaction:', error);
        throw error;
    }
};

// Khôi phục transaction từ trash
export const restoreTransaction = (id: string): void => {
    const db = openDatabase();

    const updateQuery = 'UPDATE transactions SET deleted = 0, deleted_at = NULL WHERE id = ?;';

    try {
        db.runSync(updateQuery, [id]);
        console.log('Transaction restored successfully');
    } catch (error) {
        console.error('Error restoring transaction:', error);
        throw error;
    }
};

// Lấy tất cả transactions đã bị xóa (trong trash)
export const getDeletedTransactions = (): Transaction[] => {
    const db = openDatabase();

    const selectQuery = 'SELECT * FROM transactions WHERE deleted = 1 ORDER BY deleted_at DESC;';

    try {
        const result = db.getAllSync(selectQuery);

        return result.map((row: any) => ({
            id: row.id,
            title: row.title,
            amount: row.amount,
            createdAt: new Date(row.created_at),
            type: row.type,
            category: row.category,
            description: row.description
        }));
    } catch (error) {
        console.error('Error getting deleted transactions:', error);
        return [];
    }
};

// Xóa transaction
export const deleteTransaction = (id: string): void => {
    const db = openDatabase();

    const deleteQuery = 'DELETE FROM transactions WHERE id = ?;';

    try {
        db.runSync(deleteQuery, [id]);
        console.log('Transaction deleted successfully');
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};

// Lấy tổng thu nhập và chi tiêu (chưa bị xóa)
export const getTransactionSummary = () => {
    const db = openDatabase();

    const summaryQuery = `
    SELECT 
      type,
      SUM(amount) as total
    FROM transactions 
    WHERE deleted = 0
    GROUP BY type;
  `;

    try {
        const result = db.getAllSync(summaryQuery);

        let totalIncome = 0;
        let totalExpense = 0;

        result.forEach((row: any) => {
            if (row.type === 'income') {
                totalIncome = row.total;
            } else if (row.type === 'expense') {
                totalExpense = row.total;
            }
        });

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        };
    } catch (error) {
        console.error('Error getting summary:', error);
        return {
            totalIncome: 0,
            totalExpense: 0,
            balance: 0
        };
    }
};

// Khởi tạo database khi app start
export const initializeDatabase = () => {
    try {
        createTransactionTable();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};