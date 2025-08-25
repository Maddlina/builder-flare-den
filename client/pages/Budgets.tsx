import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { expenseStore } from '@/lib/expense-store';
import { ExpenseCategory } from '@shared/types';
import { 
  PiggyBank, 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Target,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: ExpenseCategory;
  period: 'weekly' | 'monthly' | 'yearly';
  alertThreshold: number;
  isActive: boolean;
  createdAt: string;
}

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories] = useState(expenseStore.getCategories());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    categoryId: '',
    period: 'monthly' as 'weekly' | 'monthly' | 'yearly',
    alertThreshold: '80',
  });

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = () => {
    // Mock budget data - in real app, this would come from the expense store
    const mockBudgets: Budget[] = [
      {
        id: '1',
        name: 'Food & Dining',
        amount: 500,
        spent: 380,
        category: categories.find(c => c.name === 'Food & Dining')!,
        period: 'monthly',
        alertThreshold: 80,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Transportation',
        amount: 300,
        spent: 245,
        category: categories.find(c => c.name === 'Transportation')!,
        period: 'monthly',
        alertThreshold: 80,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Entertainment',
        amount: 200,
        spent: 165,
        category: categories.find(c => c.name === 'Entertainment')!,
        period: 'monthly',
        alertThreshold: 80,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Shopping',
        amount: 250,
        spent: 220,
        category: categories.find(c => c.name === 'Shopping')!,
        period: 'monthly',
        alertThreshold: 80,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
    setBudgets(mockBudgets);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBudgetStatus = (spent: number, amount: number, alertThreshold: number) => {
    const percentage = (spent / amount) * 100;
    
    if (percentage >= 100) {
      return { status: 'exceeded', color: 'text-red-600', bgColor: 'bg-red-500', label: 'Exceeded' };
    } else if (percentage >= alertThreshold) {
      return { status: 'warning', color: 'text-orange-600', bgColor: 'bg-orange-500', label: 'At Risk' };
    } else {
      return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-500', label: 'On Track' };
    }
  };

  const handleCreateBudget = () => {
    if (!formData.name || !formData.amount || !formData.categoryId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const category = categories.find(c => c.id === formData.categoryId);
    if (!category) return;

    const newBudget: Budget = {
      id: Date.now().toString(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      spent: 0,
      category,
      period: formData.period,
      alertThreshold: parseInt(formData.alertThreshold),
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setBudgets(prev => [...prev, newBudget]);
    setFormData({
      name: '',
      amount: '',
      categoryId: '',
      period: 'monthly',
      alertThreshold: '80',
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Success!",
      description: "Budget created successfully.",
    });
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Success!",
      description: "Budget deleted successfully.",
    });
  };

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  const budgetStats = [
    {
      title: 'Total Budgeted',
      value: formatCurrency(totalBudgeted),
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Spent',
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Remaining',
      value: formatCurrency(remainingBudget),
      icon: PiggyBank,
      color: remainingBudget >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: remainingBudget >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Active Budgets',
      value: budgets.filter(b => b.isActive).length.toString(),
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
                Budget Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Set spending limits and track your financial goals
              </p>
            </div>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Budget</DialogTitle>
                  <DialogDescription>
                    Set spending limits for better financial control
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget-name">Budget Name</Label>
                    <Input
                      id="budget-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Monthly Food Budget"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget-amount">Budget Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="budget-amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        className="pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Period</Label>
                      <Select value={formData.period} onValueChange={(value: any) => setFormData(prev => ({ ...prev, period: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Alert at (%)</Label>
                      <Input
                        type="number"
                        value={formData.alertThreshold}
                        onChange={(e) => setFormData(prev => ({ ...prev, alertThreshold: e.target.value }))}
                        placeholder="80"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBudget}>
                    Create Budget
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Budget Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {budgetStats.map((stat, index) => (
              <Card key={stat.title} className="glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Budget List */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold text-foreground">Your Budgets</h2>
            
            {budgets.length === 0 ? (
              <Card className="glass-card border-0 shadow-premium">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <PiggyBank className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No budgets yet</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    Create your first budget to start tracking your spending and achieving your financial goals.
                  </p>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Budget
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {budgets.map((budget, index) => {
                  const percentage = (budget.spent / budget.amount) * 100;
                  const status = getBudgetStatus(budget.spent, budget.amount, budget.alertThreshold);
                  
                  return (
                    <Card 
                      key={budget.id} 
                      className="glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
                              style={{ backgroundColor: budget.category.color }}
                            >
                              {budget.category.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{budget.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} budget
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`${status.color} ${status.bgColor.replace('bg-', 'bg-').replace('500', '100 dark:bg-').replace('100', '900/20')}`}
                            >
                              {status.status === 'good' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {status.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {status.status === 'exceeded' && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {status.label}
                            </Badge>
                            
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteBudget(budget.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                          </span>
                          <span className={`font-semibold ${status.color}`}>
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-3"
                          style={{
                            '--progress-background': budget.category.color,
                          } as React.CSSProperties}
                        />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Remaining: {formatCurrency(Math.max(0, budget.amount - budget.spent))}
                          </span>
                          <span className="text-muted-foreground">
                            Alert at {budget.alertThreshold}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
