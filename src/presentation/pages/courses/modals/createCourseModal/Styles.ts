import styled from 'styled-components'

export const CheckBoxesContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 380px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const CheckBoxOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  label {
    font-family: Roboto, sans-serif;
    color: ${({ theme }) => theme['black-400']};
    font-size: 1rem;
    cursor: pointer;
  }

  input {
    cursor: pointer;
    background-color: red;
  }
`
