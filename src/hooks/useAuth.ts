import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storage } from '../utils/helpers';
import { TOKEN_KEY, USER_KEY } from '../constants';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    role: null,
    loading: true,
  });

  useEffect(() => {
    // Check if user is logged in on mount
    const token = storage.get<string>(TOKEN_KEY);
    const user = storage.get<User>(USER_KEY);

    if (token && user) {
      setAuthState({
        user,
        isAuthenticated: true,
        role: user.role,
        loading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email,
        role,
        status: 'active',
      };

      const mockToken = 'mock-jwt-token';

      storage.set(TOKEN_KEY, mockToken);
      storage.set(USER_KEY, mockUser);

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        role,
        loading: false,
      });

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    storage.remove(TOKEN_KEY);
    storage.remove(USER_KEY);

    setAuthState({
      user: null,
      isAuthenticated: false,
      role: null,
      loading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      storage.set(USER_KEY, updatedUser);
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
};
