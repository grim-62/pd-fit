import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://fit-pd-backend.onrender.com/api';

interface AuthResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      username: string;
      email: string;
    };
  };
}

class APIClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'bypass-tunnel-warning': 'true', // For Microsoft DevTunnels
      },
    });
    
    console.log('API Client initialized with baseURL:', API_BASE_URL);

    // Add request interceptor to attach access token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken && originalRequest) {
              const response = await axios.post(
                `${API_BASE_URL}/auth/refresh-token`,
                {},
                {
                  headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                  },
                }
              );

              const { accessToken } = response.data.data;
              await AsyncStorage.setItem('accessToken', accessToken);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/app-register', {
      username,
      email,
      password,
    });
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/app-login', {
      email,
      password,
    });
    return response.data;
  }

  async getMe() {
    const response = await this.axiosInstance.get('/auth/get-me');
    return response.data;
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post('/auth/logout');
  }

  async logoutAll(): Promise<void> {
    await this.axiosInstance.post('/auth/logout-all');
  }
}

export const apiClient = new APIClient();
