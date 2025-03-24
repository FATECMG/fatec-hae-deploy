import styled from 'styled-components'

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme['black-375']};
  @media (max-width: 350px) {
    font-size: 1.75rem;
  }
`
