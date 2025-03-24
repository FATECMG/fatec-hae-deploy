import { AuthenticatedUser } from '@/domain/authentication/entities/Authentication'

export enum UserActionTypes {
  // eslint-disable-next-line no-unused-vars
  LOGIN = 'USER/LOGIN',
  // eslint-disable-next-line no-unused-vars
  LOGOUT = 'USER/LOGOUT',
}

const makeLogin = (payload: AuthenticatedUser) => ({
  type: UserActionTypes.LOGIN,
  payload,
})

const makeLogout = () => ({
  type: UserActionTypes.LOGOUT,
})

export { makeLogin, makeLogout }
