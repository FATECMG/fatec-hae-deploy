import styled from 'styled-components'

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const ModalBackground = styled.div`
  background-color: ${({ theme }) => theme['white-200']};
  position: relative;
  width: 60%;
  border: 2px solid ${({ theme }) => theme['white-250']};
  border-radius: 5px;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
    text-align: center;
    border-bottom: 2px solid #e6e5e5;
    margin-bottom: 1rem;

    @media (max-width: 1130px) {
      font-size: 1.25rem;
    }

    @media (max-width: 890px) {
      padding: 0.5rem 1.5rem;
      margin-bottom: 0;
    }

    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 750px) {
    width: 80%;
  }

  @media (max-width: 385px) {
    width: 90%;
  }
`
export const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: right;
  padding: 0 1.5rem 1.5rem 0;

  button {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    color: white;
    border: none;
    border-radius: 4px;
    background: ${({ theme }) => theme['red-400']};
    transition: background 0.5s;
    cursor: pointer;

    :hover {
      background: ${({ theme }) => theme['red-350']};
    }
  }
`
