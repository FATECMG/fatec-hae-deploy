import { INoticeUseCases } from '@/domain/notice/useCases/Interface'
import { NoticeUseCases } from '@/domain/notice/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getNoticeUseCases = (): INoticeUseCases =>
  new NoticeUseCases(getHttpClient())
