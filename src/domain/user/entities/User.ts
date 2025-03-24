import { Roles } from '@/domain/role/entities/Role'

export type possibleAcademicTitles = 'GRADUADO' | 'PÓS-GRADUADO' | 'MESTRADO' | 'DOUTORADO' | 'NENHUMA'

export interface UserCourses {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  active: boolean
  academicTitle: possibleAcademicTitles
  courses: UserCourses[]
  roles: Roles
  registerNumber: string
  email: string
  phone: string
}

export interface createdUser extends Omit<User, 'id' | 'active'> {
  password: string
}
