export function getUserHomePage(role: string): string {
  switch (role) {
    case 'ADMINISTRADOR':
      return '/inicio'
    case 'DIRETOR':
    case 'DIRETOR ADMINISTRATIVO':
      return '/inicio'
    case 'COORDENADOR':
    case 'PROFESSOR':
      return '/meusprojetos'
    default:
      return '/login'
  }
}
