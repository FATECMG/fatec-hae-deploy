import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { Comment, createdComment } from '@/domain/comment/entities/Comment'

import { ICommentUseCases } from './Interface'

import { BASE_API } from '@/config/api/Api'

const RESOURCE = `${BASE_API}/projects`

export class CommentUseCases implements ICommentUseCases {
  constructor(private readonly httpClient: IHttpClient) {}

  async findComments(projectid: string): Promise<Comment[]> {
    const { body, statusCode } = await this.httpClient.request<Comment[]>({
      method: 'get',
      resource: `${RESOURCE}/${projectid}/comments`,
    })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }

  async createComment(
    projectid: string,
    comment: createdComment,
  ): Promise<Comment> {
    const { body, statusCode } = await this.httpClient.request<Comment>({
      method: 'patch',
      resource: `${RESOURCE}/${projectid}/comments`,
      body: comment,
    })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }
}
