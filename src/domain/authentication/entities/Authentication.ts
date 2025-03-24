export interface AuthenticationResponse {
  idToken: string
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  tokenType: string
}

export interface AuthenticatedUser {
  id: string
  name: string
  email: string
  role: string
}
