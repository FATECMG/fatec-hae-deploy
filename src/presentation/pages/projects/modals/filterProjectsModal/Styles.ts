import styled from 'styled-components'

export const FiltersModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 2rem;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const FilterSectionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme['black-375']};
  text-transform: uppercase;
  margin: 0;
`

export const FiltersSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const OrderByContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FilterSeparator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    cursor: pointer;
  }
`

const BaseInput = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme['red-400']};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &::before {
    content: '';
    position: absolute;
    background: none;
    opacity: 0;
  }

  &:checked::before {
    opacity: 1;
  }

  &:focus {
    box-shadow: 0 0 4px ${({ theme }) => theme['red-350']};
  }
`

export const CheckboxInput = styled(BaseInput)`
  border-radius: 4px;

  &::before {
    border-radius: 2px;
    border-right: 3px solid ${({ theme }) => theme['red-350']};
    border-bottom: 3px solid ${({ theme }) => theme['red-350']};
    transition: all 0.3s linear;
    width: 6px;
    height: 8px;
    top: 1px;
    transform: rotate(45deg);
  }
`

export const RadioInput = styled(BaseInput)`
  border-radius: 50%;

  &::before {
    height: 7px;
    width: 7px;
    background-color: ${({ theme }) => theme['red-350']};
    border-radius: 50%;
    transition: all 0.35s linear;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: start;
  }
`

export const FilterButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 400px) {
    flex-direction: inherit;
    align-items: inherit;
  }
`
