import apiClient from './client';
import type { ApiResponse, MonthlyReport } from '../types';

export const getMonthlyReport = (year: number, month: number) =>
  apiClient.get<ApiResponse<MonthlyReport>>('/reports/monthly', {
    params: { year, month },
  });

export const getAnnualReport = (year: number) =>
  apiClient.get<ApiResponse<MonthlyReport[]>>('/reports/annual', {
    params: { year },
  });
