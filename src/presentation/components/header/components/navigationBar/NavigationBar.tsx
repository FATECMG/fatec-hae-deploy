import {
  SubOptionName,
  StyledLI,
  StyledUL,
  SubOptionList,
  StyledCaretDown,
} from './Styles'
import { NavLink, useNavigate } from 'react-router-dom'
import { getHeaderOptionsByRole } from '@/presentation/utils/GetHeaderOptionsByRole'
import { useSelector } from 'react-redux'
import { rootReducerProps } from '@/config/redux/RootReducer'

export function NavigationBar() {
  const { user } = useSelector(
    (rootReducer: rootReducerProps) => rootReducer.userReducer,
  )

  const routeOptions = getHeaderOptionsByRole(user!.role)

  const navigate = useNavigate()

  return (
    <nav>
      <StyledUL>
        {routeOptions.map((route) =>
          route.subOptions ? (
            <SubOptionList key={route.name}>
              <SubOptionName>
                {route.name}
                <StyledCaretDown size={16} weight="bold" />
              </SubOptionName>
              <ul>
                {route.subOptions.map((subOption) => (
                  <li
                    key={subOption.path}
                    onClick={() => navigate(subOption.path)}
                    title={subOption.title}
                  >
                    {subOption.name}
                  </li>
                ))}
              </ul>
            </SubOptionList>
          ) : (
            <StyledLI key={route.path} title={route.title}>
              <NavLink to={route.path}>{route.name}</NavLink>
            </StyledLI>
          ),
        )}
      </StyledUL>
    </nav>
  )
}
