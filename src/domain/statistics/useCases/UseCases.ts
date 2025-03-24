import { IStatisticsUseCases } from '@/domain/statistics/useCases/Interface'
import { Statistics } from '@/domain/statistics/entities/Statistics'

import { STATISTICS_API } from '@/config/api/Api'
import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

export class StatisticsUseCases implements IStatisticsUseCases {
  constructor(private readonly httpCliente: IHttpClient) {}

  async getStatistics(): Promise<Statistics> {
    const { body, statusCode } = await this.httpCliente.request<Statistics>({
      method: 'get',
      resource: `${STATISTICS_API}`,
    })

    return properlyResponse({ data: body, statusCode })
  }

  async updateStatistics(): Promise<Statistics> {
    const { body, statusCode } = await this.httpCliente.request<Statistics>({
      method: 'post',
      resource: `${STATISTICS_API}`,
    })

    return properlyResponse({ data: body, statusCode })
  }
}
