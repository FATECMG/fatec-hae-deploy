import { List, X } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: none;
  align-items: center;
  justify-content: right;
  height: 48px;
  background-color: ${({ theme }) => theme['red-400']};
  padding: 0rem 2.5rem;

  @media (max-width: 750px) {
    display: flex;
  }

  @media (max-width: 600px) {
    padding: 0rem 1.5rem;
  }
`

export const StyledHamburguer = styled(List)`
  color: ${({ theme }) => theme['white-200']};
  cursor: pointer;
`

export const StyledClose = styled(X)`
  color: ${({ theme }) => theme['black-400']};
  cursor: pointer;
`
export const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  line-height: 2.5rem;
  color: ${({ theme }) => theme['black-400']};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme['black-350']};
  }
`

export const ConfigOption = styled.span`
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  line-height: 2.5rem;
  color: ${({ theme }) => theme['black-400']};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme['black-350']};
  }
`

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid ${({ theme }) => theme['white-300']};
`

export const ConfigsContainer = styled(LinksContainer)`
  border: none;
`
