import { StatisticsUseCases } from '@/domain/statistics/useCases/UseCases'
import { IStatisticsUseCases } from '@/domain/statistics/useCases/Interface'
import { getHttpClientWithoutTokens } from '@/main/factories/HttpClientFactory'

export const getStatisticsUseCases = (): IStatisticsUseCases =>
  new StatisticsUseCases(getHttpClientWithoutTokens())
