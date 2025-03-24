export namespace Http {
  export type Method = 'post' | 'get' | 'put' | 'delete' | 'patch'

  export enum StatusCode {
    // eslint-disable-next-line no-unused-vars
    ok = 200,
    // eslint-disable-next-line no-unused-vars
    created = 201,
    // eslint-disable-next-line no-unused-vars
    noContent = 204,
    // eslint-disable-next-line no-unused-vars
    badRequest = 400,
    // eslint-disable-next-line no-unused-vars
    unauthorized = 401,
    // eslint-disable-next-line no-unused-vars
    forbidden = 403,
    // eslint-disable-next-line no-unused-vars
    notFound = 404,
    // eslint-disable-next-line no-unused-vars
    serverError = 500,
  }

  export type Request = {
    body?: any
    method: Http.Method
    resource: string
    header?: any
  }

  export type Response<T = any> = {
    body: T
    statusCode: Http.StatusCode
  }
}

export interface IHttpClient {
  request<T = any>(data: Http.Request): Promise<Http.Response<T>>
}
