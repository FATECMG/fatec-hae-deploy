import { Trash } from 'phosphor-react'
import styled from 'styled-components'

export const TopicOfInterestContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
  grid-gap: 1rem;
  align-items: center;

  @media (max-width: 575px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: baseline;
  }
`

export const TopicOfInterestCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme['white-175']};
  border-radius: 4px;
  padding: 0.5rem;

  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin: 0;
    font-weight: 500;
    font-size: 0.875rem;
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
