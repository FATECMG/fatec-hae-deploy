import styled from 'styled-components'
import { MainInput } from '../form'

export const SearchBarInput = styled(MainInput)`
  height: 2rem;
  width: 35rem;
  border-radius: 3px;

  @media (max-width: 870px) {
    width: 25rem;
  }

  @media (max-width: 630px) {
    width: 20rem;
  }

  @media (max-width: 515px) {
    width: 100%;
  }
`
