import { IUserUseCases } from '@/domain/user/useCases/Interface'
import { UserUseCases } from '@/domain/user/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getUserUseCases = (): IUserUseCases =>
  new UserUseCases(getHttpClient())
