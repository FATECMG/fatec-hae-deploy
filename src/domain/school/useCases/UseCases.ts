import { ISchoolUseCases } from './Interface'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { BASE_API } from '@/config/api/Api'

import { RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

import { Fields } from '@/domain/school/entities/Enums'
import { School, createdSchool } from '@/domain/school/entities/School'

const RESOURCE = `${BASE_API}/schools`

export class SchoolUseCases implements ISchoolUseCases {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(active: boolean): Promise<School[]> {
    const url = `${RESOURCE}?active=${active}`
    const { statusCode, body } = await this.httpClient.request<School[]>({
      method: 'get',
      resource: url,
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.SCHOOL.notFoundAll,
    })
  }

  async findById(id: string): Promise<School> {
    const { statusCode, body } = await this.httpClient.request<School>({
      method: 'get',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.SCHOOL.notFoundAll,
    })
  }

  async create(school: createdSchool): Promise<School> {
    const { statusCode, body } = await this.httpClient.request<School>({
      method: 'post',
      resource: `${RESOURCE}`,
      body: school,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError<Fields>(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async updateById(school: School): Promise<School> {
    const { statusCode, body } = await this.httpClient.request<School>({
      method: 'put',
      resource: `${RESOURCE}/${school.id}`,
      body: school,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError<Fields>(
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
      badRequestError: new RequestError(
        DefaultErrorMessages.SCHOOL.delete,
        'warning',
      ),
    })
  }
}
