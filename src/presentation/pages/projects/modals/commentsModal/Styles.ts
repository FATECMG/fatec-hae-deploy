import { PaperPlaneRight, X } from 'phosphor-react'
import { ModalHeader, ModalBody } from 'react-bootstrap'
import styled from 'styled-components'

interface CommentContainerProps {
  isOwner: boolean
}

export const UpdatedModalBody = styled(ModalBody)`
  padding: 0;
  scroll-behavior: smooth;
`

export const CommentsModalHeaderContainer = styled(ModalHeader)`
  justify-content: right;
  padding: 0.75rem;
`

export const CloseCommentsModalIcon = styled(X)`
  cursor: pointer;
  color: ${({ theme }) => theme['black-375']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['red-400']};
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    text-align: justify;
    margin: 0;
  }
`

export const CommentsContainer = styled.div`
  padding: 1rem 1rem 0rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const CommentContainer = styled.div<CommentContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ isOwner }) => (isOwner ? '#E1E8F2' : '#EEEEEE')};
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;
  word-wrap: break-word;
`

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const IconContainer = styled.div`
  background: ${({ theme }) => theme['white-250']};
  outline: 2px solid ${({ theme }) => theme['blue-350']};
  border-radius: 8px;
  padding: 0.5rem;
`

export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 600;
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
  }
`

export const SendMessageIcon = styled(PaperPlaneRight)`
  cursor: pointer;
  color: ${({ theme }) => theme['blue-400']};
  transition: color 0.5s;

  :hover {
    color: ${({ theme }) => theme['blue-350']};
  }
`

export const CommentFormContainer = styled.div`
  position: sticky;
  padding: 0.5rem;
  bottom: 0px;
  background-color: #fefefe;
  border-top: 2px solid ${({ theme }) => theme['white-300']};
`

export const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  input {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    height: 2.5rem;
    padding: 0rem 1rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme['white-250']};
    outline: none;
    border: none;
    width: 100%;
  }

  button {
    border: none;
    background-color: transparent;
  }
`
