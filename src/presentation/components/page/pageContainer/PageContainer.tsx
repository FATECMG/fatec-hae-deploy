import { ReactNode } from 'react'
import { Container } from './Styles'

interface PageContainerProps {
  children: ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return <Container>{children}</Container>
}
