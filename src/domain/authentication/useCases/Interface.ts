import {
  AuthenticatedUser,
  AuthenticationResponse,
} from '@/domain/authentication/entities/Authentication'

export interface IAuthenticationUseCases {
  auth(email: string, password: string): Promise<AuthenticationResponse>
  getAuthenticatedUserData(accessToken: string): Promise<AuthenticatedUser>
}
