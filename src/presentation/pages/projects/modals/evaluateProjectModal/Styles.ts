import styled from 'styled-components'

export const FeedbackCommentContainer = styled.div`
  textarea {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme['white-250']};
    outline: none;
    border: none;
    width: 100%;
    color: ${({ theme }) => theme['black-375']};
    text-transform: uppercase;

    :focus {
      outline: 1px solid ${({ theme }) => theme['blue-400']};
    }

    ::placeholder {
      text-transform: initial;
    }
  }
`
