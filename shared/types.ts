export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
  date: string;
  type: 'expense' | 'income';
  paymentMethod: PaymentMethod;
  isRecurring: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tags: string[];
  currency: string;
  location?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
  isDefault: boolean;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  categories: string[];
  startDate: string;
  endDate: string;
  alertThreshold: number; // percentage
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'bank' | 'digital' | 'crypto';
  icon: string;
  color: string;
}

export interface ExpenseAnalytics {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  topCategories: Array<{
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  averageDaily: number;
  savingsRate: number;
}

export interface UserSettings {
  defaultCurrency: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    budgetAlerts: boolean;
    dailyReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    backupToCloud: boolean;
  };
}

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf' | 'json';
  dateRange: {
    start: string;
    end: string;
  };
  categories?: string[];
  includeReceipts: boolean;
}
