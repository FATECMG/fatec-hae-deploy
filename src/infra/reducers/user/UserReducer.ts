import { AuthenticatedUser } from '@/domain/authentication/entities/Authentication'
import { UserActionTypes } from './UserActions'
import { Action } from 'redux'

interface userState {
  user: AuthenticatedUser | null
}

const initialState: userState = {
  user: null,
}

interface UserActions extends Action {
  payload: AuthenticatedUser
}

function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, user: action.payload }
    case UserActionTypes.LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export default userReducer
