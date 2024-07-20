import {AuthResponse} from '../interfaces/authResponse';

export class UserMapper {
  static UserResponseToUserEntity(userResponse: AuthResponse) {
    return {
      email: userResponse.email,
      fullName: userResponse.fullName,
      id: userResponse.id,
    };
  }
}
