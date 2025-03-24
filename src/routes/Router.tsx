import { Header } from '@/presentation/components'
import {
  Schools,
  Users,
  Courses,
  Projects,
  Notices,
  Login,
  Profile,
  MyProjects,
  Home,
  Reports,
  MyReports,
} from '@/presentation/pages'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { allowedRolesByRoute } from './allowedRolesByRoute'

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={allowedRolesByRoute.header}>
            <Header />
          </PrivateRoute>
        }
      >
        <Route
          path="/inicio"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.home}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="escolas"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.schools}>
              <Schools />
            </PrivateRoute>
          }
        />
        <Route
          path="usuarios"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.users}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="cursos"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.courses}>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="projetos"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.projects}>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="meusprojetos"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.myprojects}>
              <MyProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="relatorios"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.reports}>
              <Reports />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="meusrelatorios"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.myreports}>
              <MyReports />
            </PrivateRoute>
          }
        />
        <Route
          path="editais"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.notices}>
              <Notices />
            </PrivateRoute>
          }
        />
        <Route
          path="perfil"
          element={
            <PrivateRoute allowedRoles={allowedRolesByRoute.header}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}
