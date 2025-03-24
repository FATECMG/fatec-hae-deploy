import { userReducer } from '@/infra/reducers'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({ userReducer })

export type rootReducerProps = ReturnType<typeof rootReducer>
