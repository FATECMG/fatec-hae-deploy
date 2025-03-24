export interface errorsField<T = any> {
  field: T
  message: string
}

export class RequestError<T> extends Error {
  type: 'warning' | 'error'
  errors: errorsField<T>[] | undefined
  constructor(
    message: string,
    type: 'warning' | 'error',
    errors?: errorsField<T>[],
  ) {
    super(message)
    this.name = 'RequestError'
    this.type = type
    this.errors = errors
  }
}
