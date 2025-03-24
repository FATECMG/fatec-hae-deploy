import { rootReducerProps } from '@/config/redux/RootReducer'
import { getUserHomePage } from '@/presentation/utils/GetUserHomePage'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const location = useLocation()

  const { user } = useSelector(
    (rootReducer: rootReducerProps) => rootReducer.userReducer,
  )

  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  if (location.pathname === '/') {
    return <Navigate to={getUserHomePage(user.role)} replace={true} />
  }

  if (!allowedRoles.find((role) => role === user.role)) {
    return <Navigate to={getUserHomePage(user.role)} replace={true} />
  }
  return <>{children}</>
}
