import { CaretDown } from 'phosphor-react'
import styled from 'styled-components'

export const StyledUL = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;

  @media (max-width: 400px) {
    gap: 0.75rem;
  }
`

export const StyledLI = styled.li`
  a {
    display: block;
    height: 3rem;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 3rem;
    color: white;
    transition: 0.3s;

    &:hover {
      color: #d8d8d8;
    }
  }
`

export const SubOptionList = styled.li`
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
    border: 1px solid ${({ theme }) => theme['white-250']};
    border-radius: 2px;
    left: 50%;
    transform: translateX(-50%);
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

export const SubOptionName = styled.span`
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 3rem;
  color: white;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #d8d8d8;
  }
`

export const StyledCaretDown = styled(CaretDown)`
  color: inherit;
`
