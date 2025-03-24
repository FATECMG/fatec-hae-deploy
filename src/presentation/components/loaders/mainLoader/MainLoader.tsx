import { LoaderContainer, LoaderSpinner } from './Styles'

interface LoaderProps {
  containerHeight?: string
  loaderSize?: string
  borderSize?: string
}

export default function MainLoader({
  containerHeight = '50vh',
  loaderSize = '48px',
  borderSize = '5px',
}: LoaderProps) {
  return (
    <LoaderContainer height={containerHeight}>
      <LoaderSpinner size={loaderSize} borderSize={borderSize} />
    </LoaderContainer>
  )
}
