import { User } from './User'

export type UserErrorsFields = keyof Omit<User, 'id' | 'active' | 'courses'>
