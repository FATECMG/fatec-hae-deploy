import { School } from './School'
import { Address } from '@/domain/address/entities/Address'

export type Fields = keyof Omit<School, 'id'> & keyof Address
