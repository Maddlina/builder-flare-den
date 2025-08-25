import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ExpenseList } from '@/components/dashboard/ExpenseList';
import { CategoryAnalytics } from '@/components/dashboard/CategoryAnalytics';
import { AddExpenseModal } from '@/components/expense/AddExpenseModal';
import { Navigation } from '@/components/layout/Navigation';
import { expenseStore } from '@/lib/expense-store';
import '@/lib/sample-data'; // Load sample data
import { Expense, ExpenseAnalytics } from '@shared/types';
import { toast } from '@/components/ui/use-toast';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [analytics, setAnalytics] = useState<ExpenseAnalytics>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    topCategories: [],
    monthlyTrend: [],
    averageDaily: 0,
    savingsRate: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allExpenses = expenseStore.getExpenses();
    const analyticsData = expenseStore.getAnalytics('month');
    setExpenses(allExpenses);
    setAnalytics(analyticsData);
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      expenseStore.addExpense(expenseData);
      loadData();
      toast({
        title: "Success!",
        description: `${expenseData.type === 'income' ? 'Income' : 'Expense'} added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsAddModalOpen(true);
  };

  const handleUpdateExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingExpense) return;
    
    try {
      expenseStore.updateExpense(editingExpense.id, expenseData);
      loadData();
      setEditingExpense(null);
      toast({
        title: "Success!",
        description: "Transaction updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteExpense = (id: string) => {
    try {
      expenseStore.deleteExpense(id);
      loadData();
      toast({
        title: "Success!",
        description: "Transaction deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    try {
      const data = {
        expenses: expenses,
        analytics: analytics,
        exportDate: new Date().toISOString(),
        summary: {
          totalTransactions: expenses.length,
          totalIncome: analytics.totalIncome,
          totalExpenses: analytics.totalExpenses,
          netBalance: analytics.netBalance,
          savingsRate: analytics.savingsRate,
        }
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `expense-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete!",
        description: "Your expense data has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation 
        onAddExpense={() => setIsAddModalOpen(true)}
        onExport={handleExport}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Dashboard Header */}
          <div className="animate-slide-up">
            <DashboardHeader
              analytics={analytics}
              onAddExpense={() => setIsAddModalOpen(true)}
              onExport={handleExport}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Expense List */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <ExpenseList
                expenses={expenses}
                categories={expenseStore.getCategories()}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            {/* Right Column - Analytics */}
            <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CategoryAnalytics analytics={analytics} />
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        onSave={editingExpense ? handleUpdateExpense : handleAddExpense}
        categories={expenseStore.getCategories()}
        paymentMethods={expenseStore.getPaymentMethods()}
        editingExpense={editingExpense}
      />
    </div>
  );
}
