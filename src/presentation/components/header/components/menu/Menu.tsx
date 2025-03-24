import { NavigationBar } from '@/presentation/components/header/components/navigationBar/NavigationBar'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { useLogout } from '@/presentation/hooks'

import {
  StyledHeader,
  UserBar,
  UserBarStyledLI,
  UserControlOptions,
} from './Styles'

import { CaretDown } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

function Menu() {
  const navigate = useNavigate()
  const logout = useLogout()

  const user = GetAuthenticatedUser()

  function capitalizeFirstAndLastName(fullName: string) {
    const firstAndSecondName = fullName.split(' ').slice(0, 2).join(' ')

    return firstAndSecondName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <>
      <StyledHeader>
        <NavigationBar />
        <UserControlOptions>
          <UserBar>
            <UserBarStyledLI>
              <h2>{capitalizeFirstAndLastName(user!.name.toLowerCase())}</h2>
              <CaretDown size={16} color="#FFFFFF" weight="bold" />
            </UserBarStyledLI>
            <ul>
              <li
                onClick={() => navigate('/perfil')}
                title="Clique para visualizar seu perfil"
              >
                Visualizar perfil
              </li>
              <li onClick={logout} title="Clique para desconectar do sistema">
                Desconectar
              </li>
            </ul>
          </UserBar>
        </UserControlOptions>
      </StyledHeader>
    </>
  )
}

export default Menu
