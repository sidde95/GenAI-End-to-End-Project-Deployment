// TODO: Budget module is reserved for user implementation
// Implement the following endpoints:
//   GET    /budgets         - list all budgets
//   POST   /budgets         - create a new budget
//   GET    /budgets/:id     - get a single budget
//   PUT    /budgets/:id     - update a budget
//   DELETE /budgets/:id     - delete a budget
// Also consider: budget utilization display (spent vs. allocated)

import apiClient from './client';
import type { ApiResponse, Budget } from '../types';

// TODO: implement getbudgets
export const getBudgets = () =>
  apiClient.get<ApiResponse<Budget[]>>('/budgets');

// TODO: implement createBudget
export const createBudget = (_payload: Omit<Budget, 'id' | 'user_id' | 'category'>) =>
  apiClient.post<ApiResponse<Budget>>('/budgets', _payload);

// TODO: implement deleteBudget
export const deleteBudget = (_id: string) =>
  apiClient.delete<ApiResponse<null>>(`/budgets/${_id}`);
