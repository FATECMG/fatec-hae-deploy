import { ISchoolUseCases } from '@/domain/school/useCases/Interface'
import { SchoolUseCases } from '@/domain/school/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getSchoolUseCases = (): ISchoolUseCases =>
  new SchoolUseCases(getHttpClient())
