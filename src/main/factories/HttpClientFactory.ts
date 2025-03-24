import {
  axiosInstance,
  axiosStatisticsInstance,
} from '@/config/api/AxiosInstance'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { IHttpClient } from '@/infra/http/IHttpClient'

export const getHttpClient = (): IHttpClient =>
  new AxiosHttpClient(axiosInstance)

export const getHttpClientWithoutTokens = (): IHttpClient =>
  new AxiosHttpClient(axiosStatisticsInstance)
