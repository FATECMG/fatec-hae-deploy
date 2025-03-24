export class UnauthorizedError extends Error {
  constructor() {
    super('Não foi possível confirmar a autorização para essa ação!')
    this.name = 'UnathorizedError'
  }
}
