import { RequestError } from '@/main/error/RequestError'
import { Http } from './IHttpClient'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

interface Options<T> {
  data: T
  statusCode: Http.StatusCode
  badRequestError?: Error
  notFoundMessage?: string
}

/**
 * Returns the data if the status code is ok or created, throws an error if the status code is not found or a RequestError if the status code is bad request.
 * @template T
 * @param {T} data - The data to return.
 * @param {Http.StatusCode} statusCode - The HTTP status code.
 * @param {string} [notFoundMessage='Recurso não encontrado'] - The message to use if the status code is not found.
 * @param {RequestError} [badRequestError=new RequestError('Erro de Servidor interno!', 'error')] - The error to throw if the status code is bad request.
 */
export function properlyResponse<T>({
  data,
  statusCode,
  notFoundMessage = 'Recurso não encontrado',
  badRequestError = new RequestError('Erro de Servidor interno!', 'error'),
}: Options<T>): T {
  // TODO: Refactor this function to use the new error handling
  if (statusCode === Http.StatusCode.serverError && data === undefined)
    throw new UnauthorizedError()

  switch (statusCode) {
    case Http.StatusCode.ok:
    case Http.StatusCode.created:
      return data
    case Http.StatusCode.badRequest:
      throw badRequestError
    case Http.StatusCode.notFound:
      throw new RequestError(notFoundMessage, 'warning')
    case Http.StatusCode.unauthorized:
      throw new UnauthorizedError()
    default:
      throw new RequestError('Erro de Servidor interno!', 'error')
  }
}
