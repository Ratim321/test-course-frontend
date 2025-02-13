import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const { access, refresh } = await response.json();

          // Fetch user profile
          const profileResponse = await fetch('http://127.0.0.1:8000/api/accounts/dashboard/', {
            headers: {
              'Authorization': `Bearer ${access}`,
            },
          });
          
          if (!profileResponse.ok) {
            throw new Error('Failed to fetch user profile');
          }
          
          const dashboardData = await profileResponse.json();
          const userData = dashboardData.user;
          
          set({
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
            user: {
              id: userData.id,
              // You can concatenate first_name and last_name if needed.
              name: `${userData.first_name} ${userData.last_name}`,
              email: userData.email,
              // Adjust enrolledCourses if your API returns it, otherwise omit or set default.
              enrolledCourses: userData.enrolled_courses || [],
            },
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          // Register user
          const registerResponse = await fetch('https://edu.backend.big-matrix.com/accounts/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });

          if (!registerResponse.ok) {
            throw new Error('Registration failed');
          }

          // Login after successful registration
          await get().login(email, password);
        } catch (error) {
          console.error('Signup error:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          const response = await fetch('https://edu.backend.big-matrix.com/accounts/logout/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${get().accessToken}`,
            },
          });

          if (!response.ok) {
            console.error('Logout failed on server');
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear local state regardless of server response
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
        }
      },

      refreshAccessToken: async () => {
        try {
          const refreshToken = get().refreshToken;
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await fetch('https://edu.backend.big-matrix.com/api/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const { access } = await response.json();
          set({ accessToken: access });
        } catch (error) {
          console.error('Token refresh error:', error);
          // If refresh fails, log out the user
          await get().logout();
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist tokens and authentication status
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

// Axios instance with interceptors for automatic token refresh
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://edu.backend.big-matrix.com',
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshAccessToken } = useAuth.getState();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuth.getState().refreshAccessToken();
        const { accessToken } = useAuth.getState();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };