import { expenseStore, defaultCategories, defaultPaymentMethods } from './expense-store';

export function generateSampleData(userEmail?: string) {
  // Only generate sample data for demo users or if explicitly requested
  if (userEmail && userEmail !== 'demo@expensetracker.com') return;

  // Check if data already exists
  const existing = expenseStore.getExpenses();
  if (existing.length > 0) return;

  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    return date;
  });

  const sampleExpenses = [
    // Income
    { title: 'Salary', amount: 3500, categoryId: '9', type: 'income', description: 'Monthly salary payment' },
    { title: 'Freelance Project', amount: 750, categoryId: '9', type: 'income', description: 'Web development project' },
    { title: 'Investment Returns', amount: 120, categoryId: '9', type: 'income', description: 'Dividend payment' },
    
    // Food & Dining
    { title: 'Grocery Shopping', amount: 85.50, categoryId: '1', type: 'expense', description: 'Weekly groceries at supermarket' },
    { title: 'Lunch at Work', amount: 12.99, categoryId: '1', type: 'expense', description: 'Sandwich and coffee' },
    { title: 'Dinner with Friends', amount: 45.00, categoryId: '1', type: 'expense', description: 'Italian restaurant' },
    { title: 'Coffee Shop', amount: 4.50, categoryId: '1', type: 'expense', description: 'Morning latte' },
    { title: 'Fast Food', amount: 8.99, categoryId: '1', type: 'expense', description: 'Quick lunch' },
    
    // Transportation
    { title: 'Gas Station', amount: 55.00, categoryId: '2', type: 'expense', description: 'Fuel for car' },
    { title: 'Uber Ride', amount: 18.50, categoryId: '2', type: 'expense', description: 'Trip to airport' },
    { title: 'Public Transport', amount: 2.75, categoryId: '2', type: 'expense', description: 'Bus ticket' },
    { title: 'Parking Fee', amount: 5.00, categoryId: '2', type: 'expense', description: 'Downtown parking' },
    
    // Shopping
    { title: 'New Headphones', amount: 199.99, categoryId: '3', type: 'expense', description: 'Wireless noise-cancelling headphones' },
    { title: 'Clothes Shopping', amount: 89.99, categoryId: '3', type: 'expense', description: 'New shirt and jeans' },
    { title: 'Online Purchase', amount: 25.99, categoryId: '3', type: 'expense', description: 'Book from Amazon' },
    
    // Entertainment
    { title: 'Movie Tickets', amount: 24.00, categoryId: '4', type: 'expense', description: 'Evening movie with partner' },
    { title: 'Streaming Service', amount: 15.99, categoryId: '4', type: 'expense', description: 'Netflix subscription' },
    { title: 'Concert Tickets', amount: 85.00, categoryId: '4', type: 'expense', description: 'Live music event' },
    
    // Bills & Utilities
    { title: 'Electricity Bill', amount: 125.00, categoryId: '5', type: 'expense', description: 'Monthly electricity payment' },
    { title: 'Internet Bill', amount: 79.99, categoryId: '5', type: 'expense', description: 'High-speed internet' },
    { title: 'Phone Bill', amount: 45.00, categoryId: '5', type: 'expense', description: 'Mobile phone plan' },
    { title: 'Rent', amount: 1200.00, categoryId: '5', type: 'expense', description: 'Monthly apartment rent' },
    
    // Healthcare
    { title: 'Doctor Visit', amount: 120.00, categoryId: '6', type: 'expense', description: 'Annual checkup' },
    { title: 'Pharmacy', amount: 25.50, categoryId: '6', type: 'expense', description: 'Prescription medication' },
    
    // Education
    { title: 'Online Course', amount: 49.99, categoryId: '7', type: 'expense', description: 'Programming course on Udemy' },
    { title: 'Books', amount: 35.00, categoryId: '7', type: 'expense', description: 'Educational books' },
    
    // Travel
    { title: 'Weekend Trip', amount: 300.00, categoryId: '8', type: 'expense', description: 'Hotel and activities' },
    { title: 'Flight Booking', amount: 450.00, categoryId: '8', type: 'expense', description: 'Vacation flight tickets' }
  ];

  // Add expenses with random dates from the last 30 days
  sampleExpenses.forEach((expense, index) => {
    const randomDate = last30Days[Math.floor(Math.random() * last30Days.length)];
    const category = defaultCategories.find(c => c.id === expense.categoryId)!;
    const paymentMethod = defaultPaymentMethods[Math.floor(Math.random() * defaultPaymentMethods.length)];
    
    expenseStore.addExpense({
      title: expense.title,
      amount: expense.amount,
      category,
      paymentMethod,
      description: expense.description,
      date: randomDate.toISOString().split('T')[0],
      type: expense.type as 'income' | 'expense',
      isRecurring: Math.random() > 0.8, // 20% chance of being recurring
      recurringInterval: 'monthly',
      currency: 'USD',
      tags: Math.random() > 0.7 ? ['sample', 'demo'] : [], // 30% chance of having tags
      attachments: []
    });
  });
}

// Sample data will be generated only for demo users upon login
// No auto-generation for all users
