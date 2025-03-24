import { IAddressUseCases } from '@/domain/address/useCases/Interface'
import { AddressUseCases } from '@/domain/address/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getAddressUseCases = (): IAddressUseCases =>
  new AddressUseCases(getHttpClient())
