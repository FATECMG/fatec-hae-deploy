import { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { PlusCircle, Users as UsersIcon } from 'phosphor-react'

import {
  CreateUserModal,
  DeleteUserModal,
  EditUserModal,
  UserModal,
} from './modals'

import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  FilterContainer,
  FilterOption,
  NoEntitiesFound,
  OptionsContainer,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchBar,
  Toast,
  PageLoader,
  MainTable,
  MainTableRow,
  BreadCrumb,
  PageTitleWrapper,
} from '@/presentation/components'
import { Alert } from '@/presentation/utils/SweetAlert'
import { useLogout } from '@/presentation/hooks'
import { MainOptions } from '@/presentation/pages/schools/Styles'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'

import { RequestError, errorsField } from '@/main/error/RequestError'
import {
  getCourseUseCases,
  getRoleUseCases,
  getUserUseCases,
} from '@/main/factories'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { User, createdUser } from '@/domain/user/entities/User'
import { UserErrorsFields } from '@/domain/user/entities/UserErrors'
import { Role, Roles } from '@/domain/role/entities/Role'
import { Course } from '@/domain/course/entities/Course'

export default function Users() {
  document.title = 'Gestão de usuários'
  const [users, setUsers] = useState<User[]>([])
  const [searchUser, setSearchUser] = useState<string>('')
  const [createUserModal, setCreateUserModal] = useState<boolean>(false)
  const [userToView, setUserToView] = useState<User>()
  const [userToEdit, setUserToEdit] = useState<User>()
  const [userToDelete, setUserToDelete] = useState<User>()
  const [roleOptions, setRoleOptions] = useState<Role[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<errorsField<UserErrorsFields>[]>()
  const [courses, setCourses] = useState<Course[]>([])
  const [searchParams] = useSearchParams()
  const logout = useLogout()

  const userUseCases = getUserUseCases()
  const roleUseCases = getRoleUseCases()
  const courseUseCases = getCourseUseCases()

  const connectedUser = GetAuthenticatedUser()

  const fetchData = async (): Promise<void> => {
    try {
      const [users, roles, courses] = await Promise.all([
        userUseCases.findAll(searchParams.get('active') !== 'false'),
        roleUseCases.findAll(),
        courseUseCases.findAll(true),
      ])
      setLoading(false)
      setUsers(users)
      setRoleOptions(roles)
      setCourses(courses)
    } catch (err: unknown) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('active')])

  const filteredUsers = useMemo(() => {
    const lowerCaseSearch = searchUser.toLowerCase()
    return users.filter((user) =>
      user.name.toLowerCase().includes(lowerCaseSearch),
    )
  }, [searchUser, users])

  function updateUserState(Users: User[]): void {
    let newUsers: User[]
    switch (searchParams.get('active')) {
      case 'false':
        newUsers = Users.filter((user) => user.active === false)
        setUsers(newUsers)
        return
      default:
        newUsers = Users.filter((user) => user.active === true)
        setUsers(newUsers)
    }
  }

  async function handleCreateUser(user: createdUser) {
    try {
      const data: User = await userUseCases.create(user)
      updateUserState([...users, data])
      Toast({ message: 'Usuário criado com sucesso!', type: 'success' })
      setCreateUserModal(false)
      setErrors([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        setErrors(err.errors)
        Toast({ message: err.message, type: err.type })
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleUpdateUser(user: User) {
    try {
      const updatedUser = await userUseCases.updateById(user)
      const newUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      )
      updateUserState(newUsers)
      Toast({ message: 'Usuário atualizado com sucesso!', type: 'success' })
      setUserToEdit(undefined)
      setErrors([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        setErrors(err.errors)
        Toast({ message: err.message, type: err.type })
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteUser(id: string) {
    try {
      await userUseCases.deleteById(id)
      const newUsers = users.filter((user) => user.id !== id)
      setUsers(newUsers)
      Toast({ message: 'Usuário excluído com sucesso!', type: 'success' })
      setUserToDelete(undefined)
    } catch (err: unknown) {
      err instanceof UnauthorizedError && Alert.disconnected(logout)
      err instanceof Error ? (
        Toast({ message: err.message, type: 'error' })
      ) : (
        <></>
      )
    }
  }

  const filteredData = !searchUser ? users : filteredUsers

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitleWrapper>
          {connectedUser?.role.startsWith('DIRETOR') && (
            <BreadCrumb crumbs={[{ title: 'Início' }, { title: 'Usuários' }]} />
          )}
          <PageTitle>Gestão de usuários</PageTitle>
        </PageTitleWrapper>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por usuários"
              onChange={(event) => setSearchUser(event.target.value)}
            />
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              onClick={() => setCreateUserModal(true)}
            >
              Criar usuário
              <PlusCircle size={18} color="#FFFFFF" weight="bold" />
            </MainButton>
          </MainOptions>
          <FilterContainer>
            <OptionsContainer>
              <FilterOption
                label="Usuários Ativos"
                param="active"
                value="true"
                defaultChecked={true}
              />
              <FilterOption
                label="Usuários Inativos"
                param="active"
                value="false"
              />
            </OptionsContainer>
          </FilterContainer>
        </PageHeader>
        {createUserModal && (
          <CreateUserModal
            courses={courses}
            roleOptions={roleOptions}
            handleCreateUser={handleCreateUser}
            show={createUserModal}
            onHide={() => {
              setCreateUserModal(false)
              setErrors([])
            }}
            possibleErrors={errors}
          />
        )}
        {userToView && (
          <UserModal
            user={userToView}
            show={!!userToView}
            onHide={() => setUserToView(undefined)}
          />
        )}
        {userToEdit && (
          <EditUserModal
            courses={courses}
            user={userToEdit}
            show={!!userToEdit}
            onHide={() => {
              setUserToEdit(undefined)
              setErrors([])
            }}
            handleUpdateUser={handleUpdateUser}
            possibleErrors={errors}
            roleOptions={roleOptions}
          />
        )}
        {userToDelete && (
          <DeleteUserModal
            userId={userToDelete.id}
            username={userToDelete.name}
            show={!!userToDelete}
            onHide={() => setUserToDelete(undefined)}
            handleDeleteUser={handleDeleteUser}
          />
        )}
        <PageLoader loading={loading} />
        {users.length === 0 && !loading && (
          <NoEntitiesFound
            message="Comece criando um novo usuário ou redefinindo os filtros de busca"
            Icon={<UsersIcon size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!loading && filteredData.length > 0 && (
          <MainTable headers={['Nome', 'Cargo', 'E-mail', 'Ações']}>
            {filteredData
              // Ensure that the connected user can't manage and see its own MainCard
              .filter((user) => user.id !== connectedUser?.id)
              // Ensure that the connected user can't manage and see dministrators
              .filter((user) => user.roles !== Roles.ADMINISTRATOR)
              .sort((current, next) => current.name.localeCompare(next.name))
              .map((user) => (
                <MainTableRow
                  key={user.id}
                  entityData={[user.name, user.roles, user.email]}
                  viewEntity={() => setUserToView(user)}
                  editEntity={() => setUserToEdit(user)}
                  deleteEntity={() => setUserToDelete(user)}
                />
              ))}
          </MainTable>
        )}
      </PageContainer>
    </>
  )
}
