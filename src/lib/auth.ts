import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import usersData from '../data/users.json';

interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  joinDate: string;
  studyTime: number;
  completionRate: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
  }>;
  progress: {
    [courseId: string]: {
      progress: number;
      completedLessons: number;
      totalLessons: number;
      lastAccessed: string;
      nextLesson: string;
      lastActivity: string;
    };
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const user = usersData.users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const { password: _, ...userWithoutPassword } = user;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });
      },

      signup: async (name: string, email: string, password: string) => {
        const existingUser = usersData.users.find((u) => u.email === email);
        if (existingUser) {
          throw new Error('User already exists');
        }

        // In a real app, this would add to the database
        // For demo purposes, just log in the first user
        const { password: _, ...userWithoutPassword } = usersData.users[0];
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);