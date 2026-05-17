export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  category?: Category;
}

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  period: 'monthly' | 'yearly';
  start_date: string;
  end_date?: string;
  category?: Category;
}

export interface Holding {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  quantity: number;
  cost_basis: number;
  current_price: number;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface DashboardSummary {
  total_income: number;
  total_expenses: number;
  net_worth: number;
  period: string;
}

export interface MonthlyReport {
  month: string;
  income: number;
  expenses: number;
  net: number;
  categories: Array<{
    category: string;
    amount: number;
    type: 'income' | 'expense';
  }>;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}
