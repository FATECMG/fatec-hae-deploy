import { IAuthenticationUseCases } from '@/domain/authentication/useCases/Interface'
import { Authentication } from '@/domain/authentication/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getAuthenticationUseCases = (): IAuthenticationUseCases =>
  new Authentication(getHttpClient())
