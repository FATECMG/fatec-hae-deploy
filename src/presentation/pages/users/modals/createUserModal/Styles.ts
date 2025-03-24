import styled from 'styled-components'

interface AlignedInputsProps {
  breakpoint?: string
}

export const UserFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    margin: 0;
  }
`

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ColoredErrorMessage = styled.p`
  color: red;
`

export const AlignedInputs = styled.div<AlignedInputsProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  width: 100%;

  @media (max-width: ${({ breakpoint }) => breakpoint || '575px'}) {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }
`

export const InputDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
