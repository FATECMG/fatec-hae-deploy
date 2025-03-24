import { ReactNode } from 'react'
import { Title } from './Styles'

interface PageTitleProps {
  children: ReactNode
}

export default function PageTitle({ children }: PageTitleProps) {
  return <Title>{children}</Title>
}
