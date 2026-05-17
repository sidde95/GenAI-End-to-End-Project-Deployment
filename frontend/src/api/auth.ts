import apiClient from './client';
import type { ApiResponse, AuthTokenResponse, User } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export const login = (payload: LoginPayload) =>
  apiClient.post<ApiResponse<AuthTokenResponse>>('/auth/login', payload);

export const register = (payload: RegisterPayload) =>
  apiClient.post<ApiResponse<User>>('/auth/register', payload);

export const getMe = () =>
  apiClient.get<ApiResponse<User>>('/auth/me');
