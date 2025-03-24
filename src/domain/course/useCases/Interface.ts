import { Course, CreatedCourse } from '@/domain/course/entities/Course'

export interface IcourseUseCases {
  findAll(active: boolean): Promise<Course[]>
  findById(id: string): Promise<Course>
  create(course: CreatedCourse): Promise<Course>
  updateById(course: Course): Promise<Course>
  deleteById(id: string): Promise<void>
}
