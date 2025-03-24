import { User, createdUser } from '@/domain/user/entities/User'

import { IUserUseCases } from './Interface'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

import { BASE_API } from '@/config/api/Api'

import { UserErrorsFields } from '@/domain/user/entities/UserErrors'

const RESOURCE = `${BASE_API}/users`

export class UserUseCases implements IUserUseCases {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(active: boolean): Promise<User[]> {
    const url = `${RESOURCE}?active=${active}`
    const { statusCode, body } = await this.httpClient.request<User[]>({
      method: 'get',
      resource: url,
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.USER.notFoundAll,
    })
  }

  async findAllByRole(active: boolean, role: string): Promise<User[]> {
    return (await this.findAll(active)).filter(
      (user) => user.roles.toLocaleUpperCase() === role.toLocaleUpperCase(),
    )
  }

  async findById(id: string): Promise<User> {
    const { statusCode, body } = await this.httpClient.request<User>({
      method: 'get',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.USER.notFoundOne,
    })
  }

  async create(user: createdUser): Promise<User> {
    const { statusCode, body } = await this.httpClient.request<User>({
      method: 'post',
      resource: RESOURCE,
      body: user,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError<UserErrorsFields>(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async updateById(user: User): Promise<User> {
    const { statusCode, body } = await this.httpClient.request<User>({
      method: 'put',
      resource: `${RESOURCE}/${user.id}`,
      body: user,
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
      badRequestError: new RequestError(
        DefaultErrorMessages.USER.delete,
        'warning',
      ),
    })
  }
}
