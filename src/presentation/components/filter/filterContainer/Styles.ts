import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    margin: 0;
  }

  @media (max-width: 395px) {
    gap: 0.5rem;
  }
`
