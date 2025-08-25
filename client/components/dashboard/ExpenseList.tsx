import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  Receipt,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Expense, ExpenseCategory } from "@shared/types";
import { useState, useMemo } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  categories: ExpenseCategory[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ExpenseList({ 
  expenses, 
  categories, 
  onEdit, 
  onDelete, 
  searchTerm, 
  onSearchChange 
}: ExpenseListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || expense.category.id === filterCategory;
      const matchesType = filterType === 'all' || expense.type === filterType;
      
      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.name.localeCompare(b.category.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [expenses, searchTerm, sortBy, filterCategory, filterType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Receipt className="h-5 w-5" />
          Recent Transactions
        </CardTitle>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-32">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredAndSortedExpenses.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No transactions found</h3>
            <p className="text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterType !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Start by adding your first expense or income'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedExpenses.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
                      style={{ backgroundColor: expense.category.color }}
                    >
                      {expense.category.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{expense.title}</h3>
                        <Badge 
                          variant={expense.type === 'income' ? 'default' : 'secondary'}
                          className={expense.type === 'income' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {expense.type === 'income' ? '↗' : '↙'} {expense.category.name}
                        </Badge>
                        {expense.isRecurring && (
                          <Badge variant="outline" className="text-xs">
                            🔄 Recurring
                          </Badge>
                        )}
                      </div>
                      
                      {expense.description && (
                        <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(expense.date)}
                        </span>
                        <span>{expense.paymentMethod.icon} {expense.paymentMethod.name}</span>
                        {expense.tags.length > 0 && (
                          <span>🏷️ {expense.tags.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {expense.currency}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(expense)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(expense.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
