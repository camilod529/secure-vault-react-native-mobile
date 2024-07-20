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
    const user = UserMapper.UserResponseToUserEntity(data);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
