import { ArrowsCounterClockwise } from 'phosphor-react'
import styled, { css, keyframes } from 'styled-components'

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);

  @media (max-width: 740px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

export const HomeWelcomeMessageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme['black-375']};
`

export const UpdateStatisticsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h2 {
    font-size: 0.875rem;
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme['black-350']};
    margin: 0;
  }

  p {
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme['black-350']};
    margin: 0;
  }
`

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`

export const UpdateStatisticsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${({ theme }) => theme['blue-400']};
  border-radius: 6px;
  padding: 0.5rem;
  transition: background-color 0.5s linear;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme['blue-350']};
  }
`

interface UpdateIconProps {
  animate: number
}

export const UpdateIcon = styled(ArrowsCounterClockwise)<UpdateIconProps>`
  color: white;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${spinAnimation} 1s linear infinite;
    `}
`

export const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`

export const StatisticColumn = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`
