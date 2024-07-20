import {create} from 'zustand';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: {};
  //* Methods
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  //* Methods
  login: async (email: string, password: string) => {
    return false;
  },
  register: async (email: string, password: string, fullName: string) => {
    return false;
  },
  checkStatus: async () => {},

  logout: async () => {},
}));
