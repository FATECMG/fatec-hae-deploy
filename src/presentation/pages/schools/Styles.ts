import styled from 'styled-components'

export const MainOptions = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 515px) {
    gap: 1rem;
    flex-direction: column;

    button {
      width: 8rem;
    }
  }
`
