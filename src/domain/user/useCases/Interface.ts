import { User, createdUser } from '@/domain/user/entities/User'

export interface IUserUseCases {
  findAll(active: boolean): Promise<User[]>
  findAllByRole(active: boolean, role: string): Promise<User[]>
  findById(id: string): Promise<User>
  create(user: createdUser): Promise<User>
  updateById(user: User): Promise<User>
  deleteById(id: string): Promise<void>
}
