import styled from 'styled-components'

interface StatisticIconContainerProps {
  bgColor: string
}

export const StatisticCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 0.5rem;
  margin: 0;
  border-radius: 0px 6px;
  background-color: white;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  box-shadow: 0px -4px 0px ${({ theme }) => theme['blue-350']} inset;
  border: 0 solid rgba(34, 41, 47, 0.125);
  width: 100%;

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme['black-350']};
    margin: 0;
  }

  h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme['black-375']};
    margin: 0;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme['black-375']};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
`

export const StatisticIconContainer = styled.div<StatisticIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ bgColor }) => `rgba(${bgColor}, 0.2)`};
  border-radius: 50%;
  padding: 0.375rem;
`
