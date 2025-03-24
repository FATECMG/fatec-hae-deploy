import { Notice, CreatedNotice } from '@/domain/notice/entities/Notice'
import { NoticeFields } from '@/domain/notice/entities/Enums'

import { INoticeUseCases } from './Interface'

import { BASE_API } from '@/config/api/Api'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

const RESOURCE = `${BASE_API}/notices`

export class NoticeUseCases implements INoticeUseCases {
  constructor(private httpClient: IHttpClient) {}
  async findAll(active: boolean): Promise<Notice[]> {
    const url = `${RESOURCE}?active=${active}`

    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { body, statusCode } = await this.httpClient.request<Notice[]>({
      method: 'get',
      resource: url,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.NOTICE.notFoundAll,
    })
  }

  async create(notice: CreatedNotice): Promise<Notice> {
    const { body, statusCode } = await this.httpClient.request<Notice>({
      method: 'post',
      resource: RESOURCE,
      body: notice,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError<NoticeFields>(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async updateById(notice: Notice): Promise<Notice> {
    const { body, statusCode } = await this.httpClient.request({
      method: 'put',
      resource: `${RESOURCE}/${notice.id}`,
      body: notice,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async deleteById(id: string): Promise<void> {
    const { statusCode } = await this.httpClient.request({
      method: 'delete',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      data: undefined,
      statusCode,
      notFoundMessage: DefaultErrorMessages.NOTICE.delete,
    })
  }
}
