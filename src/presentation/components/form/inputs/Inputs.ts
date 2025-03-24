import styled from 'styled-components'

export const MainInput = styled.input`
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) =>
    props.disabled === true
      ? ({ theme }) => theme['white-300']
      : ({ theme }) => theme['white-150']};

  color: ${({ theme }) => theme['black-375']};
  border: none;
  font-size: 1rem;
  height: 1.75rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border-radius: 4px;
  transition: border 0.3s;
  border: 1px solid ${({ theme }) => theme['white-350']};

  :focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme['blue-350']};
  }
`
export const MainSelect = styled.select`
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) =>
    props.disabled === true
      ? ({ theme }) => theme['white-300']
      : ({ theme }) => theme['white-150']};
  color: ${({ theme }) => theme['black-375']};
  border: none;
  font-size: 1rem;
  height: 1.75rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  transition: border 0.3s;
  border: 1px solid ${({ theme }) => theme['white-350']};

  :focus {
    outline: none;
    outline: none;
    border: 1px solid ${({ theme }) => theme['blue-350']};
  }
`

export const MainTextArea = styled.textarea`
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) =>
    props.disabled === true
      ? ({ theme }) => theme['white-300']
      : ({ theme }) => theme['white-150']};
  color: ${({ theme }) => theme['black-375']};
  border: none;
  font-size: 1rem;
  width: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: outline 0.2s ease-out;
  outline: 1px solid ${({ theme }) => theme['white-350']};

  :focus {
    outline: 1px solid ${({ theme }) => theme['black-300']};
  }
`
