import { Role } from '@/domain/role/entities/Role'

export interface IroleUseCases {
  findAll(): Promise<Role[]>
}
