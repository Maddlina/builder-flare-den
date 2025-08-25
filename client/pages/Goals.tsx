import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  Plus, 
  Calendar,
  DollarSign,
  TrendingUp,
  Flag,
  Clock,
  CheckCircle2,
  Zap,
  Star,
  Trophy,
  Gift,
  Sparkles
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: 'savings' | 'investment' | 'debt' | 'emergency' | 'purchase' | 'vacation';
  deadline: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const goalCategories = [
  { id: 'savings', name: 'Savings', icon: '💰', color: '#22c55e' },
  { id: 'investment', name: 'Investment', icon: '📈', color: '#3b82f6' },
  { id: 'debt', name: 'Debt Payoff', icon: '💳', color: '#ef4444' },
  { id: 'emergency', name: 'Emergency Fund', icon: '🛡️', color: '#f59e0b' },
  { id: 'purchase', name: 'Major Purchase', icon: '🛍️', color: '#8b5cf6' },
  { id: 'vacation', name: 'Vacation', icon: '✈️', color: '#06b6d4' },
];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build a 6-month emergency fund for financial security',
      targetAmount: 15000,
      currentAmount: 8500,
      category: 'emergency',
      deadline: '2024-12-31',
      isCompleted: false,
      priority: 'high',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'New Laptop',
      description: 'Save for a new MacBook Pro for work',
      targetAmount: 2500,
      currentAmount: 1200,
      category: 'purchase',
      deadline: '2024-06-30',
      isCompleted: false,
      priority: 'medium',
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      title: 'Investment Portfolio',
      description: 'Build a diversified investment portfolio',
      targetAmount: 10000,
      currentAmount: 3500,
      category: 'investment',
      deadline: '2024-12-31',
      isCompleted: false,
      priority: 'high',
      createdAt: '2024-01-15',
    },
    {
      id: '4',
      title: 'Europe Vacation',
      description: 'Dream vacation to Europe for 2 weeks',
      targetAmount: 5000,
      currentAmount: 5000,
      category: 'vacation',
      deadline: '2024-08-01',
      isCompleted: true,
      priority: 'medium',
      createdAt: '2023-12-01',
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    category: 'savings' as Goal['category'],
    deadline: '',
    priority: 'medium' as Goal['priority'],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getCategoryInfo = (category: Goal['category']) => {
    return goalCategories.find(c => c.id === category) || goalCategories[0];
  };

  const handleCreateGoal = () => {
    if (!formData.title || !formData.targetAmount || !formData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      category: formData.category,
      deadline: formData.deadline,
      isCompleted: false,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
    };

    setGoals(prev => [...prev, newGoal]);
    setFormData({
      title: '',
      description: '',
      targetAmount: '',
      category: 'savings',
      deadline: '',
      priority: 'medium',
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Success!",
      description: "Goal created successfully.",
    });
  };

  const addToGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount;
        const isCompleted = newAmount >= goal.targetAmount;
        
        if (isCompleted && !goal.isCompleted) {
          toast({
            title: "🎉 Goal Achieved!",
            description: `Congratulations! You've reached your goal: ${goal.title}`,
          });
        }
        
        return {
          ...goal,
          currentAmount: newAmount,
          isCompleted,
        };
      }
      return goal;
    }));
  };

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(goal => goal.isCompleted).length;
  const activeGoals = goals.filter(goal => !goal.isCompleted).length;

  const goalStats = [
    {
      title: 'Total Goal Amount',
      value: formatCurrency(totalGoalAmount),
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Amount Saved',
      value: formatCurrency(totalSavedAmount),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Completed Goals',
      value: completedGoals.toString(),
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Active Goals',
      value: activeGoals.toString(),
      icon: Flag,
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                Goals & Targets
              </h1>
              <p className="text-muted-foreground mt-1">
                Set financial goals and track your progress towards achieving them
              </p>
            </div>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                  <DialogDescription>
                    Set a financial target and track your progress
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input
                      id="goal-title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Emergency Fund"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="goal-description">Description</Label>
                    <Textarea
                      id="goal-description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your goal..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-amount">Target Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="goal-amount"
                          type="number"
                          value={formData.targetAmount}
                          onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
                          className="pl-8"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goal-deadline">Target Date</Label>
                      <Input
                        id="goal-deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {goalCategories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGoal}>
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Goal Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {goalStats.map((stat, index) => (
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

          {/* Goals Grid */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Your Goals</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {completedGoals} completed
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {activeGoals} active
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal, index) => {
                const categoryInfo = getCategoryInfo(goal.category);
                const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card 
                    key={goal.id} 
                    className={`glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300 ${
                      goal.isCompleted ? 'ring-2 ring-green-500/20' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
                            style={{ backgroundColor: categoryInfo.color }}
                          >
                            {categoryInfo.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {goal.title}
                              {goal.isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            </CardTitle>
                            <CardDescription>{goal.description}</CardDescription>
                          </div>
                        </div>
                        
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                          </span>
                          <span className="font-semibold">{percentage.toFixed(1)}%</span>
                        </div>
                        
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-3"
                          style={{
                            '--progress-background': categoryInfo.color,
                          } as React.CSSProperties}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {goal.isCompleted ? 'Completed' : `${daysUntilDeadline} days left`}
                        </div>
                        <span>
                          Remaining: {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                        </span>
                      </div>
                      
                      {!goal.isCompleted && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => addToGoal(goal.id, 50)}
                          >
                            +$50
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => addToGoal(goal.id, 100)}
                          >
                            +$100
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                            onClick={() => {
                              const amount = prompt('Enter amount to add:');
                              if (amount && !isNaN(parseFloat(amount))) {
                                addToGoal(goal.id, parseFloat(amount));
                              }
                            }}
                          >
                            Custom
                          </Button>
                        </div>
                      )}
                      
                      {goal.isCompleted && (
                        <div className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                          <Trophy className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-green-600 font-semibold">Goal Achieved! 🎉</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
