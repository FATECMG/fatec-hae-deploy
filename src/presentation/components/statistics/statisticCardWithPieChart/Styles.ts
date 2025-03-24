import styled from 'styled-components'

export const CardWithChart = styled.div`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem 1.5rem 1rem;
  gap: 1rem;
  margin: 0;
  background-color: white;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  border: 0 solid rgba(34, 41, 47, 0.125);
  width: 100%;
`

export const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme['black-350']};

  @media (max-width: 550px) {
    text-align: center;
  }
`

export const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  /* max-height: 12rem; */

  @media (max-width: 550px) {
    position: relative;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    /* max-height: 20rem; */
  }
`

export const CardContentContainer = styled.div`
  display: inherit;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;

  p {
    font-family: 'Monteserrat', sans-serif;
    color: ${({ theme }) => theme['black-375']};
    font-size: 0.875rem;
    margin: 0;
    text-transform: lowercase;

    strong {
      font-size: 0.9375rem;
      font-weight: 600;
      color: ${({ theme }) => theme['black-350']};
    }
  }
`

export const ChartWrapper = styled.div`
  height: 12rem;
  @media (max-width: 550px) {
    height: 10rem;
  }
`

export const NotFoundDataContainer = styled.div`
  width: 100%;
  min-height: 12rem;

  div {
    padding-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.25rem;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    color: ${({ theme }) => theme['black-375']};
    margin: 0;
    text-align: center;
  }
`
