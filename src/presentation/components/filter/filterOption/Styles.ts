import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface FilterOptionProps {
  chosen?: string
  defaultChecked?: boolean
}

export const Option = styled(Link)<FilterOptionProps>`
  display: flex;
  cursor: pointer;
  gap: 0.25rem;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme['black-400']};
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  background: ${({ chosen, defaultChecked }) =>
    chosen === 'true' || defaultChecked ? '#d3e9ed' : '#e5e5e5'};
  transition: transform 0.15s linear;

  :hover {
    color: ${({ theme }) => theme['black-400']};
    transform: translateY(-1px);
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
  }
`
