import { ReactNode } from 'react'
import { P } from './Styles'

interface StyledPProps {
  children: ReactNode
}

export default function StyledP({ children }: StyledPProps) {
  return <P>{children}</P>
}
