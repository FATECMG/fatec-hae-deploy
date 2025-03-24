import { useEffect, useState } from 'react'
import {
  ConfigOption,
  ConfigsContainer,
  LinksContainer,
  StyledClose,
  StyledHamburguer,
  StyledHeader,
  StyledLink,
} from './Styles'

import Offcanvas from 'react-bootstrap/Offcanvas'
import { getHeaderOptionsByRole } from '@/presentation/utils/GetHeaderOptionsByRole'
import { useNavigate } from 'react-router-dom'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { useDispatch } from 'react-redux'
import { makeLogout } from '@/infra/reducers/user/UserActions'

export default function MobileHeader() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const setDimension = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension)

    return () => {
      window.removeEventListener('resize', setDimension)
    }
  }, [screenWidth])

  const [show, setShow] = useState(false)

  const user = GetAuthenticatedUser()

  const routeOptions = getHeaderOptionsByRole(user!.role)

  function capitalizeFirstAndLastName(fullName: string) {
    const firstAndSecondName = fullName.split(' ').slice(0, 2).join(' ')

    return firstAndSecondName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function desconnectUser(): void {
    dispatch(makeLogout())
    navigate('/login', { replace: true })
  }

  if (screenWidth > 750) {
    return <></>
  }

  return (
    <StyledHeader>
      <StyledHamburguer onClick={() => setShow(true)} size={20} weight="bold" />
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            {capitalizeFirstAndLastName(user!.name.toLowerCase())}
          </Offcanvas.Title>
          <StyledClose onClick={() => setShow(false)} size={20} weight="bold" />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LinksContainer>
            {routeOptions.map((option) =>
              option.subOptions ? (
                option.subOptions.map((subOption) => (
                  <StyledLink
                    onClick={() => setShow(false)}
                    to={subOption.path}
                    key={subOption.name}
                  >
                    {subOption.name}
                  </StyledLink>
                ))
              ) : (
                <StyledLink
                  onClick={() => setShow(false)}
                  to={option.path}
                  key={option.name}
                >
                  {option.name}
                </StyledLink>
              ),
            )}
          </LinksContainer>
          <ConfigsContainer>
            <ConfigOption>
              <StyledLink to="/perfil" onClick={() => setShow(false)}>
                Visualizar perfil
              </StyledLink>
            </ConfigOption>
            <ConfigOption onClick={desconnectUser}>Desconectar</ConfigOption>
          </ConfigsContainer>
        </Offcanvas.Body>
      </Offcanvas>
    </StyledHeader>
  )
}
