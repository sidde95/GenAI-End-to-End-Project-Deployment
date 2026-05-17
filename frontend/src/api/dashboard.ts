import apiClient from './client';
import type { ApiResponse, DashboardSummary } from '../types';

export const getDashboardSummary = (period?: string) =>
  apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary', {
    params: period ? { period } : undefined,
  });
