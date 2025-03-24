import {
  Pencil,
  Trash,
  ChatText,
  PaperPlaneTilt,
  ClipboardText,
  ChartBar,
  Eye,
} from 'phosphor-react'
import styled from 'styled-components'
import {
  ProjectStatusColors,
  availableColor,
} from '../../Card/projectCard/Styles'

export const StyledTableRow = styled.tr`
  text-align: center;
  cursor: pointer;
  height: 2.375rem;

  td {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    color: ${({ theme }) => theme['black-375']};
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    background-color: rgb(242, 242, 242);
  }
`

export const StyledProjectStatusCell = styled.div<ProjectStatusColors>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ status }) =>
      availableColor[status as keyof typeof availableColor]};
  }
`

export const OptionsSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin: 0;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.75rem;
  }
`

export const StyledPencil = styled(Pencil)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: black;
  }
`

export const StyledTrash = styled(Trash)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['red-400']};
  }
`

export const IconsSide = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const StyledChatIcon = styled(ChatText)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['blue-350']};
  }
`

export const StyledSubmitIcon = styled(PaperPlaneTilt)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['green-400']};
  }
`

export const StyledCheckIcon = styled(ClipboardText)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['yellow-400']};
  }
`

export const StyledChartBar = styled(ChartBar)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['green-400']};
  }
`

export const StyledEye = styled(Eye)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['green-400']};
  }
`
