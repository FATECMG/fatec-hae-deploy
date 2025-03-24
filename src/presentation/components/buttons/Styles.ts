import styled from 'styled-components'
import { defaultTheme } from '@/presentation/styles/themes/Default'

type colorsOption = typeof defaultTheme

interface MainButtonProps {
  color: keyof colorsOption
  hoverColor: keyof colorsOption
}

export const MainButton = styled.button<MainButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  color: white;
  border: none;
  border-radius: 4px;
  background: ${({ theme, color }) => theme[color]};
  transition: background 0.5s;
  cursor: pointer;

  :hover {
    background: ${({ theme, hoverColor }) => theme[hoverColor]};
  }
`

export const PrettyButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme['blue-400']};
  color: ${({ theme }) => theme['blue-400']};
  border-radius: 4px;
  background: transparent;
  transition: background 0.3s;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme['blue-400']};
    color: white;
  }
`
