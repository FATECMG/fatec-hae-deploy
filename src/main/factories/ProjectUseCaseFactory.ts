import { ProjecUseCase } from '@/domain/project/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getProjectUseCases = () => new ProjecUseCase(getHttpClient())
