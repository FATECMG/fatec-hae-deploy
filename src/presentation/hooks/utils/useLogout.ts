import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { makeLogout } from '@/infra/reducers/user/UserActions'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const execute = () => {
    dispatch(makeLogout())
    sessionStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  return execute
}
