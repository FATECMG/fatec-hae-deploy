/* eslint-disable no-unused-vars */
export interface Role {
  id: string
  name: string
  active: boolean
}

export enum Roles {
  ADMINISTRATOR = 'ADMINISTRADOR',
  COORDINATOR = 'COORDENADOR',
  DIRECTOR = 'DIRETOR',
  ADM_DIRECTOR = 'DIRETOR ADMINISTRATIVO',
  TEACHER = 'PROFESSOR',
}
