import styled from 'styled-components'

interface TopicOfInterestCardProps {
  chosen?: boolean
}

export const StyledTextArea = styled.textarea`
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  background-color: ${({ theme }) => theme['white-300']};
  color: ${({ theme }) => theme['black-375']};
  width: 100%;
  border: none;
  font-size: 1rem;
  padding: 0.25rem;
`

export const TopicsOfInterestContainer = styled.div`
  display: flex;
  gap: 0.5rem 1rem;
  flex-wrap: wrap;
`

export const TopicOfInterestCard = styled.div<TopicOfInterestCardProps>`
  display: flex;
  cursor: pointer;
  gap: 0.5rem;
  align-items: center;
  background: ${({ chosen, theme }) =>
    chosen ? '#e8f4f8' : theme['white-175']};
  border-radius: 6px;
  padding: 0.5rem;
  transition: transform 0.15s linear;

  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin: 0;
    font-weight: 500;
    font-size: 0.875rem;
  }

  :hover {
    transform: translateY(-3px);
  }
`

export const UserListContainer = styled.div`
  width: 100%;
  position: relative;
`

export const SuggestionList = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 1;
  top: 28px;
  padding: 0.5rem;
  margin: 0;
  background-color: ${({ theme }) => theme['white-250']};
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 4px;
  border: 1px solid #c1c1c1;
  width: 100%;
  max-height: 10rem;
`

export const SuggestionItem = styled.li`
  font-family: 'Roboto', sans-serif;
  font-size: 0.8125rem;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme['white-300']};
  }
`
