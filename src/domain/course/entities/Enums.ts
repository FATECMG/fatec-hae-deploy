import { Course } from './Course'

export type Fields = keyof Omit<Course, 'id'>
