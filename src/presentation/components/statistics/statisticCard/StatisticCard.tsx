import { ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react'
import { StatisticCardContainer, StatisticIconContainer } from './Styles'
import { IconProps } from 'phosphor-react'

interface StatisticCardProps {
  title: string
  iconBgColor: string
  statistic: string | number
  icon: ReactElement<
    ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  >
}

export default function StatisticCard({
  title,
  icon,
  statistic,
  iconBgColor,
}: StatisticCardProps) {
  return (
    <StatisticCardContainer>
      <StatisticIconContainer bgColor={iconBgColor}>
        {icon}
      </StatisticIconContainer>
      <h3>{title}</h3>
      <h4>{statistic}</h4>
      <p>Total</p>
    </StatisticCardContainer>
  )
}
