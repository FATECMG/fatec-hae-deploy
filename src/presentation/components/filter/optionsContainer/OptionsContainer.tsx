import { ReactNode } from 'react'
import { Container } from './Styles'

interface OptionsProps {
  children: ReactNode
}

export default function OptionsContainer({ children }: OptionsProps) {
  return <Container>{children}</Container>
}
