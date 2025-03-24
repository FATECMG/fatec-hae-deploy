import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { Role } from '@/domain/role/entities/Role'

import { IroleUseCases } from './Interface'

import { BASE_API } from '@/config/api/Api'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

const RESOURCE = `${BASE_API}/roles`

export class RoleUseCases implements IroleUseCases {
  constructor(private readonly httpClient: IHttpClient) {}
  async findAll(): Promise<Role[]> {
    const { statusCode, body } = await this.httpClient.request<Role[]>({
      method: 'get',
      resource: RESOURCE,
    })

    return properlyResponse({
      statusCode,
      data: body,
      notFoundMessage: DefaultErrorMessages.ROLE.notFoundAll,
    })
  }
}
