export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    createdAt: Date;
    type: TransactionType;
    category?: string;
    description?: string;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date;
}

export interface TransactionSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}