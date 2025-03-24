import { ReactNode } from 'react'
import { PageHeaderContainer } from './Styles'

interface PageHeaderProps {
  children: ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <PageHeaderContainer>{children}</PageHeaderContainer>
}
