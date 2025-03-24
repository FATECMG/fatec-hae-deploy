import {
  ChatText,
  Pencil,
  Trash,
  PaperPlaneTilt,
  ClipboardText,
} from 'phosphor-react'
import styled from 'styled-components'

export const availableColor = {
  RASCUNHO: '#bac7f0',
  ENVIADO: '#9f7bed',
  'EM VALIDAÇÃO': '#FFD600',
  APROVADO: '#55c46e',
  REJEITADO: '#e45852',
  'DEVOLVIDO PARA AJUSTES': '#8a9fff',
}

export interface ProjectStatusColors {
  status: string
}

export const InformationCard = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem 0rem;
  background-color: ${({ theme }) => theme['white-250']};
  border: 2px solid ${({ theme }) => theme['white-300']};
  color: black;
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s;

  @media (max-width: 515px) {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }

  :hover {
    transform: scale(1.005);
  }
`

export const CardTitleContainer = styled.div<ProjectStatusColors>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme['black-400']};
    word-break: break-all;
  }

  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
    background: ${({ status }) =>
      availableColor[status as keyof typeof availableColor]};
    font-weight: 600;
    margin: 0;
    padding: 0.25rem;
    border-radius: 4px;
    color: ${({ theme }) => theme['black-400']};
    word-break: break-all;
    letter-spacing: 0.5px;
  }
`

export const OptionsSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin: 0;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.75rem;
  }

  @media (max-width: 515px) {
    justify-content: space-between;
    width: 100%;
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
    color: ${({ theme }) => theme['green-400']};
  }
`
