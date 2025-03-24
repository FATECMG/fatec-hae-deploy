import { IcourseUseCases } from '@/domain/course/useCases/Interface'
import { CourseUseCases } from '@/domain/course/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getCourseUseCases = (): IcourseUseCases =>
  new CourseUseCases(getHttpClient())
