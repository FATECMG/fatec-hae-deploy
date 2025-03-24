import styled from 'styled-components'

export const NoEntitiesFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 50vh;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme['black-400']};
  font-weight: 600;
  margin: 0rem;
  text-align: center;
`

export const Paragraph = styled.p`
  font-size: 1.125rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme['black-400']};
  margin: 0rem;
  text-align: center;
`
