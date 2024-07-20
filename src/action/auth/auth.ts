import {StorageAdapter} from '../../config/adapters/storage.adapter';
import {secureVaultApi} from '../../config/api/secureVaultApi';
import {User} from '../../domain/entity/user';
import {AuthResponse} from '../../infrastructure/interfaces/authResponse';
import {UserMapper} from '../../infrastructure/mappers/userMapper';

export const authLogin = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const {data} = await secureVaultApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    const token = data.token;

    StorageAdapter.setItem('token', token);

    const user = UserMapper.UserResponseToUserEntity(data);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
): Promise<User | null> => {
  try {
    const {data} = await secureVaultApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });

    const token = data.token;

    StorageAdapter.setItem('token', token);

    const user = UserMapper.UserResponseToUserEntity(data);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const authCheckStatus = async (): Promise<User | null> => {
  try {
    const token = await StorageAdapter.getItem('token');

    if (!token) {
      return null;
    }

    const {data} = await secureVaultApi.get<AuthResponse>('/auth/check-status');

    await StorageAdapter.setItem('token', data.token);

    const user = UserMapper.UserResponseToUserEntity(data);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
