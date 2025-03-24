import styled from 'styled-components'

interface iconContainerProps {
  left?: string
  right?: string
  pointer?: boolean
}

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  box-shadow: 15px 15px 0px -10px ${({ theme }) => theme['red-350']},
    15px 15px 10px -6px rgba(0, 0, 0, 0.36);
  padding: 2.5rem;
  width: 500px;
  border-radius: 0px 20px;
`

export const FormTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme['black-400']};
  margin: 0;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const InputSeparator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const InputContainer = styled.div`
  position: relative;
`

export const IconContainer = styled.span<iconContainerProps>`
  position: absolute;
  top: 50%;
  left: 10px;
  left: ${({ left }) => (left ? `${left}px` : 'auto')};
  right: ${({ right }) => (right ? `${right}px` : 'auto')};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
  transform: translateY(-50%);
`

export const LoginLabel = styled.label`
  font-size: 1.125rem;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
`

export const LoginInput = styled.input`
  height: 40px;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${({ theme }) => theme['white-300']};
  border-radius: 4px;
  outline: none;
  width: 100%;
  transition: 0.3s border;

  ::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
  }

  :focus {
    border: 1px solid ${({ theme }) => theme['blue-350']};
  }
`

export const ButtonSeparator = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1rem;
`

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto', sans-serif;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme['blue-400']};
  color: white;
  transition: 0.5s background;
  padding: 0.5rem 1rem;

  :hover {
    background: ${({ theme }) => theme['blue-350']};
  }
`

export const ErrorMessage = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: red;
  margin: 0;
`
