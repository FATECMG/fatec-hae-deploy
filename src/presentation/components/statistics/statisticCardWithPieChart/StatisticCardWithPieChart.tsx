import { Pie } from 'react-chartjs-2'
import {
  CardBody,
  CardTitle,
  CardWithChart,
  CardContentContainer,
  ChartWrapper,
  NotFoundDataContainer,
} from './Styles'
import { Browsers } from 'phosphor-react'

interface PieChartConfig {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

interface StatisticCardWithChartProps {
  title: string
  total: number
  statistics: number[]
  labels: string[]
  chartConfig: PieChartConfig
}

export default function StatisticCardWithPieChart({
  title,
  total,
  statistics,
  labels,
  chartConfig,
}: StatisticCardWithChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const totalData =
    statistics.length > 1
      ? statistics.reduce((total, statistic) => total + statistic)
      : 0

  return (
    <CardWithChart>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        {totalData > 0 && (
          <>
            <CardContentContainer>
              {statistics.map((statistic, index) => (
                <p key={index}>
                  <strong>{((statistic / total) * 100).toFixed(1)}% </strong>
                  de {labels[index]} <strong>({statistic})</strong>
                </p>
              ))}
            </CardContentContainer>

            <ChartWrapper>
              <Pie data={chartConfig} options={options} />
            </ChartWrapper>
          </>
        )}
        {totalData === 0 && (
          <NotFoundDataContainer>
            <div>
              <Browsers size={48} /> Não foram encontrados dados para gerar o
              gráfico
            </div>
          </NotFoundDataContainer>
        )}
      </CardBody>
    </CardWithChart>
  )
}
