import apiClient from './client';
import type { ApiResponse, Holding } from '../types';

export interface HoldingPayload {
  symbol: string;
  name: string;
  quantity: number;
  cost_basis: number;
  current_price: number;
}

export const getHoldings = () =>
  apiClient.get<ApiResponse<Holding[]>>('/holdings');

export const createHolding = (payload: HoldingPayload) =>
  apiClient.post<ApiResponse<Holding>>('/holdings', payload);

export const deleteHolding = (id: string) =>
  apiClient.delete<ApiResponse<null>>(`/holdings/${id}`);
