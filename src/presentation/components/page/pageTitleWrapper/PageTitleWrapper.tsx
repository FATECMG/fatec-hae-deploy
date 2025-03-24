import { ReactNode } from 'react'
import { StyledPageTitleWrapper } from './Styles'

interface PageTitleWrapperProps {
  children: ReactNode
}

export default function PageTitleWrapper({ children }: PageTitleWrapperProps) {
  return <StyledPageTitleWrapper>{children}</StyledPageTitleWrapper>
}
