import { ReactNode } from 'react'
import { Container } from './Styles'

interface FilterContainerProps {
  children: ReactNode
}

export default function FilterContainer({ children }: FilterContainerProps) {
  return (
    <Container>
      <p>Filtrar por:</p>
      {children}
    </Container>
  )
}
