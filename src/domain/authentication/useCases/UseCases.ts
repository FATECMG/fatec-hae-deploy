import { Http, IHttpClient } from '@/infra/http/IHttpClient'
import {
  AuthenticatedUser,
  AuthenticationResponse,
} from '../entities/Authentication'
import { IAuthenticationUseCases } from './Interface'
import { BASE_API } from '@/config/api/Api'

const RESOURCE = `${BASE_API}/auth`

export class Authentication implements IAuthenticationUseCases {
  constructor(private httpClient: IHttpClient) {}

  async getAuthenticatedUserData(
    accessToken: string,
  ): Promise<AuthenticatedUser> {
    const { body, statusCode } = await this.httpClient.request({
      method: 'post',
      resource: `${RESOURCE}/user`,
      body: { accessToken },
    })

    switch (statusCode) {
      case Http.StatusCode.ok:
        return body
      default:
        throw new Error('Não foi possível fazer o login!')
    }
  }

  async auth(email: string, password: string): Promise<AuthenticationResponse> {
    const { body, statusCode } = await this.httpClient.request({
      method: 'post',
      resource: RESOURCE,
      body: { email, password },
    })

    switch (statusCode) {
      case Http.StatusCode.ok:
        return body
      case Http.StatusCode.badRequest:
        throw new Error(this.getMessageFromBody(body))
      case Http.StatusCode.unauthorized:
        throw new Error('E-mail ou senha inválidos!')
      default:
        throw new Error('Não foi possível fazer o login!')
    }
  }

  private getMessageFromBody(body: any): string {
    return body[0].message
  }
}
