import styled from 'styled-components'

export const MainLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => theme['black-400']};
  font-size: 1rem;
`

export const MainLabelWithRemoveButton = styled(MainLabel)`
  display: flex;
  aligh-items: center;
  justify-content: space-between;
`
