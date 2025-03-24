import { School, createdSchool } from '@/domain/school/entities/School'

export interface ISchoolUseCases {
  findAll(active: boolean): Promise<School[]>
  findById(id: string): Promise<School>
  create(school: createdSchool): Promise<School>
  updateById(school: School): Promise<School>
  deleteById(id: string): Promise<void>
}
