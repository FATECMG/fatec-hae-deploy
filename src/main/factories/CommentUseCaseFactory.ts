import { ICommentUseCases } from '@/domain/comment/useCases/Interface'
import { CommentUseCases } from '@/domain/comment/useCases/UseCases'
import { getHttpClient } from './HttpClientFactory'

export const getCommentUseCases = (): ICommentUseCases =>
  new CommentUseCases(getHttpClient())
