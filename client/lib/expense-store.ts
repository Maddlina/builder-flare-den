import { Expense, ExpenseCategory, Budget, PaymentMethod, ExpenseAnalytics } from '@shared/types';

// Default categories with modern icons and colors
export const defaultCategories: ExpenseCategory[] = [
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#ef4444', budget: 500, isDefault: true },
  { id: '2', name: 'Transportation', icon: '🚗', color: '#3b82f6', budget: 300, isDefault: true },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#8b5cf6', budget: 200, isDefault: true },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#f59e0b', budget: 150, isDefault: true },
  { id: '5', name: 'Bills & Utilities', icon: '⚡', color: '#10b981', budget: 800, isDefault: true },
  { id: '6', name: 'Healthcare', icon: '🏥', color: '#ec4899', budget: 200, isDefault: true },
  { id: '7', name: 'Education', icon: '📚', color: '#6366f1', budget: 300, isDefault: true },
  { id: '8', name: 'Travel', icon: '✈️', color: '#14b8a6', budget: 400, isDefault: true },
  { id: '9', name: 'Income', icon: '💰', color: '#22c55e', budget: 0, isDefault: true },
  { id: '10', name: 'Savings', icon: '🏦', color: '#0ea5e9', budget: 0, isDefault: true },
];

export const defaultPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Cash', type: 'cash', icon: '💵', color: '#22c55e' },
  { id: '2', name: 'Credit Card', type: 'card', icon: '💳', color: '#3b82f6' },
  { id: '3', name: 'Debit Card', type: 'card', icon: '💳', color: '#8b5cf6' },
  { id: '4', name: 'Bank Transfer', type: 'bank', icon: '🏦', color: '#0ea5e9' },
  { id: '5', name: 'PayPal', type: 'digital', icon: '📱', color: '#0070ba' },
  { id: '6', name: 'Crypto', type: 'crypto', icon: '₿', color: '#f7931a' },
];

class ExpenseStore {
  private expenses: Expense[] = [];
  private categories: ExpenseCategory[] = defaultCategories;
  private budgets: Budget[] = [];
  private paymentMethods: PaymentMethod[] = defaultPaymentMethods;

  constructor() {
    this.loadFromStorage();
  }

  // Local Storage Management
  private saveToStorage() {
    const data = {
      expenses: this.expenses,
      categories: this.categories,
      budgets: this.budgets,
      paymentMethods: this.paymentMethods,
    };
    localStorage.setItem('expenseTracker', JSON.stringify(data));
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('expenseTracker');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.expenses = data.expenses || [];
        this.categories = data.categories || defaultCategories;
        this.budgets = data.budgets || [];
        this.paymentMethods = data.paymentMethods || defaultPaymentMethods;
      } catch (error) {
        console.error('Error loading from storage:', error);
      }
    }
  }

  // Expense Management
  addExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Expense {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.expenses.unshift(newExpense);
    this.saveToStorage();
    return newExpense;
  }

  updateExpense(id: string, updates: Partial<Expense>): Expense | null {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    this.expenses[index] = {
      ...this.expenses[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveToStorage();
    return this.expenses[index];
  }

  deleteExpense(id: string): boolean {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    this.expenses.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  getExpenses(filters?: {
    type?: 'expense' | 'income';
    category?: string;
    dateRange?: { start: string; end: string };
    search?: string;
  }): Expense[] {
    let filtered = [...this.expenses];

    if (filters?.type) {
      filtered = filtered.filter(e => e.type === filters.type);
    }

    if (filters?.category) {
      filtered = filtered.filter(e => e.category.id === filters.category);
    }

    if (filters?.dateRange) {
      filtered = filtered.filter(e => {
        const expenseDate = new Date(e.date);
        return expenseDate >= new Date(filters.dateRange!.start) && 
               expenseDate <= new Date(filters.dateRange!.end);
      });
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(search) ||
        e.description?.toLowerCase().includes(search) ||
        e.category.name.toLowerCase().includes(search)
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Analytics
  getAnalytics(period: 'week' | 'month' | 'year' = 'month'): ExpenseAnalytics {
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const periodExpenses = this.expenses.filter(e => 
      new Date(e.date) >= startDate && new Date(e.date) <= now
    );

    const totalIncome = periodExpenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = periodExpenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = new Map<string, number>();
    periodExpenses
      .filter(e => e.type === 'expense')
      .forEach(e => {
        const current = categoryTotals.get(e.category.id) || 0;
        categoryTotals.set(e.category.id, current + e.amount);
      });

    const topCategories = Array.from(categoryTotals.entries())
      .map(([categoryId, amount]) => ({
        category: this.categories.find(c => c.id === categoryId)!,
        amount,
        percentage: (amount / totalExpenses) * 100,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      topCategories,
      monthlyTrend: [], // Simplified for now
      averageDaily: totalExpenses / 30,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
    };
  }

  // Getters
  getCategories(): ExpenseCategory[] {
    return this.categories;
  }

  getPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods;
  }

  getBudgets(): Budget[] {
    return this.budgets;
  }
}

export const expenseStore = new ExpenseStore();
