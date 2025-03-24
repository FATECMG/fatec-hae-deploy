import { Statistics } from '@/domain/statistics/entities/Statistics'

export interface IStatisticsUseCases {
  getStatistics(): Promise<Statistics>
  updateStatistics(): Promise<Statistics>
}
