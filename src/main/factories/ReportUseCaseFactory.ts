import { ReportUseCases } from '@/domain/report/useCases/UseCases'

import { getHttpClient, getHttpClientWithoutTokens } from './HttpClientFactory'

export const getReportUseCases = () => {
  return new ReportUseCases(getHttpClient(), getHttpClientWithoutTokens())
}
