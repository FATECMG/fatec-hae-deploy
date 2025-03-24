import { Address } from '@/domain/address/entities/Address'

export interface IAddressUseCases {
  getByPostCode(postCode: string): Promise<Address>
}
