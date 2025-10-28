/**
 * Auth Service
 * Authentication and user management
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, ApiResponse, handleApiError } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  rating: number;
  verified: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  private readonly baseUrl = '/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        `${this.baseUrl}/login`,
        credentials
      );
      
      const authData = response.data.data;
      await this.saveAuthData(authData);
      
      return authData;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        `${this.baseUrl}/register`,
        data
      );
      
      const authData = response.data.data;
      await this.saveAuthData(authData);
      
      return authData;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/logout`);
    } catch (error) {
      // Continue with local logout even if API fails
      console.error('Logout API error:', error);
    } finally {
      await this.clearAuthData();
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      if (userData) {
        return JSON.parse(userData);
      }
      
      // Fetch from API if not in storage
      const response = await api.get<ApiResponse<User>>(`${this.baseUrl}/me`);
      const user = response.data.data;
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = await AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<ApiResponse<{ token: string }>>(
        `${this.baseUrl}/refresh`,
        { refreshToken }
      );

      const newToken = response.data.data.token;
      await AsyncStorage.setItem(this.TOKEN_KEY, newToken);

      return newToken;
    } catch (error) {
      await this.clearAuthData();
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  /**
   * Save auth data to storage
   */
  private async saveAuthData(authData: AuthResponse): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(this.TOKEN_KEY, authData.token),
      AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken),
      AsyncStorage.setItem(this.USER_KEY, JSON.stringify(authData.user)),
    ]);
  }

  /**
   * Clear auth data from storage
   */
  private async clearAuthData(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(this.TOKEN_KEY),
      AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY),
      AsyncStorage.removeItem(this.USER_KEY),
    ]);
  }
}

export const authService = new AuthService();
