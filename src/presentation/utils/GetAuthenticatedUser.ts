import { rootReducerProps } from '@/config/redux/RootReducer'
import { useSelector } from 'react-redux'

export function GetAuthenticatedUser() {
  const { user } = useSelector(
    (rootReducer: rootReducerProps) => rootReducer.userReducer,
  )

  return user
}
