import { IconProps } from 'phosphor-react'
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react'
import { NoEntitiesFoundContainer, Title, Paragraph } from './Styles'

interface NoEntitiesFoundProps {
  Icon: ReactElement<
    ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  >
  message: string
}

export default function NoEntitiesFound({
  Icon,
  message,
}: NoEntitiesFoundProps) {
  return (
    <NoEntitiesFoundContainer>
      {Icon}
      <Title>Nenhum item encontrado</Title>
      <Paragraph>{message}</Paragraph>
    </NoEntitiesFoundContainer>
  )
}
