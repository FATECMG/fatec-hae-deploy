import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme['red-400']};
  padding: 0rem 5rem;

  @media (max-width: 1024px) {
    padding: 0rem 2.5rem;
  }

  @media (max-width: 600px) {
    padding: 0rem 1.5rem;
  }

  @media (max-width: 750px) {
    display: none;
  }
`

export const UserBar = styled.li`
  list-style: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  :hover {
    overflow: visible;
    ul {
      opacity: 1;
    }
  }

  :not(:hover) {
    ul {
      opacity: 0;
    }
  }

  ul {
    display: block;
    transition: opacity 0.5s;
    position: absolute;
    padding: 0;
    width: 140px;
    border: 1px solid ${({ theme }) => theme['white-325']};
    border-radius: 2px;
    right: 0;
    list-style: none;

    li {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      padding: 0.5rem;
      text-align: center;
      background-color: white;
      color: black;
      transition: 0.3s;

      :hover {
        background-color: #e6e5e5;
      }
    }
  }
`

export const UserBarStyledLI = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  line-height: 3rem;

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
    line-height: 3rem;
    margin: 0;
    color: white;
    font-weight: 400;
  }
`

export const UserControlOptions = styled.ul`
  margin: 0;
  @media (max-width: 550px) {
    display: none;
  }
`
