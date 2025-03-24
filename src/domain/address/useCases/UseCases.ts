import { BASE_API } from '@/config/api/Api'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { Address } from '@/domain/address/entities/Address'

import { RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

import { IAddressUseCases } from './Interface'

export class AddressUseCases implements IAddressUseCases {
  constructor(private readonly httpClient: IHttpClient) {}
  async getByPostCode(postCode: string): Promise<Address> {
    const { statusCode, body } = await this.httpClient.request<Address>({
      method: 'get',
      resource: `${BASE_API}/address/${postCode}`,
    })

    return properlyResponse({
      data: body,
      notFoundMessage: DefaultErrorMessages.ADDRESS.notFound,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.ADDRESS.notFound,
        'warning',
      ),
    })
  }
}
