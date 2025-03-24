interface subOptions {
  name: string
  path: string
  title: string
}

interface Options {
  name: string
  path: string
  subOptions?: subOptions[]
  title: string
}

// eslint-disable-next-line no-unused-vars
enum titles {
  // eslint-disable-next-line no-unused-vars
  SCHOOLS = 'Acessar página de escolas',
  // eslint-disable-next-line no-unused-vars
  HOME = 'Acessar página inicial',
  // eslint-disable-next-line no-unused-vars
  USERS = 'Acessar página de usuários',
  // eslint-disable-next-line no-unused-vars
  COURSES = 'Acessar página de cursos',
  // eslint-disable-next-line no-unused-vars
  MYPROJECTS = 'Acessar seus projetos',
  // eslint-disable-next-line no-unused-vars
  EVALUATEPROJECTS = 'Acessar e avaliar projetos',
  // eslint-disable-next-line no-unused-vars
  NOTICES = 'Acessar página de editais',
  // eslint-disable-next-line no-unused-vars
  REPORTS = 'Acessar página de relatórios',
}

export function getHeaderOptionsByRole(role: string): Options[] {
  switch (role) {
    case 'ADMINISTRADOR':
      return [
        {
          name: 'Início',
          path: '/inicio',
          title: titles.HOME,
        },
        {
          name: 'Escolas',
          path: '/escolas',
          title: titles.SCHOOLS,
        },
        {
          name: 'Usuários',
          path: '/usuarios',
          title: titles.USERS,
        },
      ]
    case 'DIRETOR':
    case 'DIRETOR ADMINISTRATIVO':
      return [
        {
          name: 'Início',
          path: '/inicio',
          title: titles.HOME,
        },
        {
          name: 'Usuários',
          path: '/usuarios',
          title: titles.USERS,
        },
        {
          name: 'Cursos',
          path: '/cursos',
          title: titles.COURSES,
        },
        {
          name: 'Projetos',
          path: '/projetos',
          title: titles.EVALUATEPROJECTS,
          subOptions: [
            {
              name: 'Meus projetos',
              path: '/meusprojetos',
              title: titles.MYPROJECTS,
            },
            {
              name: 'Avaliar projetos',
              path: '/projetos',
              title: titles.EVALUATEPROJECTS,
            },
          ],
        },
        {
          name: 'Editais',
          path: '/editais',
          title: titles.NOTICES,
        },
        {
          name: 'Relatórios',
          path: '/relatorios',
          title: titles.REPORTS,
        },
      ]
    case 'COORDENADOR':
      return [
        {
          name: 'Projetos',
          path: '/projetos',
          title: titles.EVALUATEPROJECTS,
          subOptions: [
            {
              name: 'Meus projetos',
              path: '/meusprojetos',
              title: titles.MYPROJECTS,
            },
            {
              name: 'Avaliar projetos',
              path: '/projetos',
              title: titles.EVALUATEPROJECTS,
            },
          ],
        },
        {
          name: 'Editais',
          path: '/editais',
          title: titles.NOTICES,
        },
      ]
    case 'PROFESSOR':
      return [
        {
          name: 'Projetos',
          path: '/meusprojetos',
          title: titles.MYPROJECTS,
        },
        {
          name: 'Editais',
          path: '/editais',
          title: titles.NOTICES,
        },
        {
          name: 'Relatórios',
          path: '/meusrelatorios',
          title: titles.REPORTS,
        },
      ]
    default:
      return []
  }
}
