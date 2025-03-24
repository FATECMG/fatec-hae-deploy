import styled from 'styled-components'

interface LoaderContainerProps {
  height: string
}

interface LoaderSpinnerProps {
  size: string
  borderSize: string
}

export const LoaderContainer = styled.div<LoaderContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
`

export const LoaderSpinner = styled.span<LoaderSpinnerProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: ${({ borderSize }) => borderSize} solid
    ${({ theme }) => theme['white-300']};
  border-bottom-color: ${({ theme }) => theme['black-350']};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
