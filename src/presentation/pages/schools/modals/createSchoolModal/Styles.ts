import styled from 'styled-components'

interface ButtonsDivProps {
  justifyOption?: 'right' | 'left' | 'center' | 'space-between' | 'space-evenly'
}

export const ButtonsDiv = styled.div<ButtonsDivProps>`
  display: flex;
  justify-content: ${({ justifyOption }) => justifyOption || 'space-between'};
`

export const CreateSchoolModalTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  text-align: center;
  border-bottom: 2px solid #e6e5e5;
  margin-bottom: 1rem;
`
