import { CaretRight } from 'phosphor-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledOrderedList = styled.ol`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
  align-items: center;
`

export const StyledItem = styled.li`
  font-size: 0.875rem;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme['black-350']};
  font-weight: 500;
`

export const StyledArrowRightIcon = styled(CaretRight)`
  color: ${({ theme }) => theme['black-350']};
`

export const StyledBreadCrumbLink = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme['red-350']};
  transition: color 0.2s linear;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme['red-300']};
  }
`
