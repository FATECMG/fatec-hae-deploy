import { ReactNode } from 'react'
import { Container } from './Styles'

interface CardsContainerProps {
  children: ReactNode
}

export default function CardsContainer({ children }: CardsContainerProps) {
  return <Container>{children}</Container>
}
