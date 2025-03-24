import { IHttpClient, Http } from './IHttpClient'

import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpClient {
  constructor(private readonly axios: AxiosInstance) {}

  async request<T>(data: Http.Request): Promise<Http.Response<T>> {
    const response: Http.Response<T> = await this.axios
      .request({
        url: data.resource,
        method: data.method,
        data: data.body,
        headers: data.header,
      })
      .then((axiosResponse: AxiosResponse) => {
        return this.successResponse<T>(axiosResponse)
      })
      .catch((axiosError: AxiosError) => {
        return this.errorResponse<T>(axiosError)
      })

    return response
  }

  private successResponse<T>(axiosResponse: AxiosResponse): Http.Response<T> {
    return {
      body: axiosResponse.data?.body ?? axiosResponse.data,
      statusCode: axiosResponse.status,
    }
  }

  private errorResponse<T>(axiosError: AxiosError): Http.Response<T> {
    const code = axiosError.response?.status ? axiosError.response.status : 500
    return {
      statusCode: code,
      body: axiosError.response ? axiosError.response.data : (undefined as any),
    }
  }
}
