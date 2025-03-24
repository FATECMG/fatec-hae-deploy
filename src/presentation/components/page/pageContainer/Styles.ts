import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2.5rem 5rem;

  @media (max-width: 1024px) {
    padding: 2.5rem 2.5rem;
  }

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
  }
`
