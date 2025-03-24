import styled from 'styled-components'

interface LoadingProps {
  loading: number
}

export const PageLoaderContainer = styled.div<LoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: ${({ theme }) => theme['white-325']};
  width: 100%;
  height: calc(100vh - 3rem);
  left: 0;
  bottom: 0;
  z-index: 0;
  opacity: ${({ loading }) => (loading ? 1 : 0)};
  transition: opacity 0.5s;
`
