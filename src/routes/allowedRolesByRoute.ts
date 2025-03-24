import { Roles } from '@/domain/role/entities/Role'

export const allowedRolesByRoute = {
  header: [
    Roles.ADMINISTRATOR,
    Roles.DIRECTOR,
    Roles.ADM_DIRECTOR,
    Roles.COORDINATOR,
    Roles.TEACHER,
  ],
  home: [Roles.DIRECTOR, Roles.ADM_DIRECTOR],
  schools: [Roles.ADMINISTRATOR],
  users: [Roles.ADMINISTRATOR, Roles.DIRECTOR, Roles.ADM_DIRECTOR],
  courses: [Roles.DIRECTOR, Roles.ADM_DIRECTOR],
  myprojects: [
    Roles.DIRECTOR,
    Roles.ADM_DIRECTOR,
    Roles.COORDINATOR,
    Roles.TEACHER,
  ],
  projects: [Roles.DIRECTOR, Roles.ADM_DIRECTOR, Roles.COORDINATOR],
  notices: [
    Roles.DIRECTOR,
    Roles.ADM_DIRECTOR,
    Roles.COORDINATOR,
    Roles.TEACHER,
  ],
  reports: [Roles.ADM_DIRECTOR, Roles.DIRECTOR],
  myreports: [Roles.TEACHER],
}
