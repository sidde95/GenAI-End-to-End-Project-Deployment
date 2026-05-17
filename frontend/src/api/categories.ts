import apiClient from './client';
import type { ApiResponse, Category } from '../types';

export const getCategories = () =>
  apiClient.get<ApiResponse<Category[]>>('/categories');

export const createCategory = (payload: Omit<Category, 'id'>) =>
  apiClient.post<ApiResponse<Category>>('/categories', payload);
