import {create} from 'zustand';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {authLogin} from '../../../action/auth/auth';
import {User} from '../../../domain/entity/user';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
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
  status: 'unauthenticated',
  token: undefined,
  user: undefined,

  //* Methods
  login: async (email: string, password: string) => {
    const user = await authLogin(email, password);

    if (user) {
      set({status: 'authenticated', user});
      return true;
    }
    return false;
  },
  register: async (email: string, password: string, fullName: string) => {
    return false;
  },
  checkStatus: async () => {},

  logout: async () => {},
}));
