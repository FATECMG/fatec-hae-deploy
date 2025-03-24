import styled from 'styled-components'

interface ModalFormProps {
  gap?: string
}

const ModalForm = styled.form<ModalFormProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  gap: ${({ gap }) => gap ?? '0.5rem'};

  @media (max-width: 1095px) {
    flex-wrap: wrap;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    margin: 0;
  }
`

export default ModalForm
