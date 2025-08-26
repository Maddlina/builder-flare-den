import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateSampleData } from './sample-data';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    currency: string;
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      budgetAlerts: boolean;
      weeklyReports: boolean;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration (in real app, this would come from a backend)
const DEMO_USERS: Record<string, User & { password: string }> = {
  'demo@expensetracker.com': {
    id: '1',
    email: 'demo@expensetracker.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date().toISOString(),
    preferences: {
      theme: 'system' as const,
      currency: 'USD',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        budgetAlerts: true,
        weeklyReports: true,
      },
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('expense-tracker-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('expense-tracker-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      localStorage.setItem('expense-tracker-user', JSON.stringify(userWithoutPassword));

      // Generate sample data only for demo user
      if (email === 'demo@expensetracker.com') {
        generateSampleData(email);
      }

      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (DEMO_USERS[email]) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        currency: 'USD',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          budgetAlerts: true,
          weeklyReports: true,
        },
      },
    };
    
    // Add to demo users (in real app, this would be saved to backend)
    DEMO_USERS[email] = { ...newUser, password };
    
    setUser(newUser);
    localStorage.setItem('expense-tracker-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('expense-tracker-user');
    localStorage.removeItem('expenseTracker'); // Clear expense data too
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('expense-tracker-user', JSON.stringify(updatedUser));
    
    // Update demo users
    if (DEMO_USERS[user.email]) {
      DEMO_USERS[user.email] = { ...DEMO_USERS[user.email], ...updates };
    }
    
    setIsLoading(false);
    return true;
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>): Promise<boolean> => {
    if (!user) return false;
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    
    return updateProfile(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    updatePreferences,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  email: 'demo@expensetracker.com',
  password: 'demo123',
};
