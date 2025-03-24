import { RoleUseCases } from '@/domain/role/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'
import { IroleUseCases } from '@/domain/role/useCases/Interface'

export const getRoleUseCases = (): IroleUseCases =>
  new RoleUseCases(getHttpClient())
