import apiClient from './client';
import type { ApiResponse, PaginatedResponse, Transaction } from '../types';

export interface TransactionPayload {
  category_id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface TransactionFilters {
  page?: number;
  page_size?: number;
  type?: 'income' | 'expense';
  category_id?: string;
  start_date?: string;
  end_date?: string;
}

export const getTransactions = (filters?: TransactionFilters) =>
  apiClient.get<PaginatedResponse<Transaction>>('/transactions', { params: filters });

export const createTransaction = (payload: TransactionPayload) =>
  apiClient.post<ApiResponse<Transaction>>('/transactions', payload);

export const deleteTransaction = (id: string) =>
  apiClient.delete<ApiResponse<null>>(`/transactions/${id}`);
