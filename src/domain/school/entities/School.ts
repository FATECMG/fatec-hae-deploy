import { Address } from '@/domain/address/entities/Address'

export interface School {
  id: string
  name: string
  active: boolean
  address: Address
}

export interface createdSchool extends Omit<School, 'id'> {}
