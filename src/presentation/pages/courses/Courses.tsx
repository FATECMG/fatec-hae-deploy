import { ToastContainer } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChalkboardTeacher, PlusCircle } from 'phosphor-react'

import { Course, CreatedCourse } from '@/domain/course/entities/Course'
import { Fields } from '@/domain/course/entities/Enums'
import { User } from '@/domain/user/entities/User'

import { RequestError, errorsField } from '@/main/error/RequestError'
import { getCourseUseCases, getUserUseCases } from '@/main/factories'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { MainOptions } from '@/presentation/pages/schools/Styles'
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
  MainTable,
  MainTableRow,
  PageLoader,
  BreadCrumb,
  PageTitleWrapper,
} from '@/presentation/components'
import {
  DeleteCourseModal,
  CourseModal,
  CreateCourseModal,
  EditCourseModal,
} from '@/presentation/pages/courses/modals'
import { Alert } from '@/presentation/utils/SweetAlert'
import { useLogout } from '@/presentation/hooks'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'

export default function Courses() {
  document.title = 'Gestão de cursos'

  const [courses, setCourses] = useState<Course[]>([])
  const [searchCourse, setSearchCourse] = useState<string>('')
  const [createCourseModal, setCreateCourseModal] = useState<boolean>(false)
  const [courseToView, setCourseToView] = useState<Course>()
  const [courseToEdit, setCourseToEdit] = useState<Course>()
  const [courseToDelete, setCourseToDelete] = useState<Course>()
  const [formErros, setFormErros] = useState<errorsField<Fields>[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const [users, setUsers] = useState<User[]>([])
  const logout = useLogout()

  const courseUseCases = getCourseUseCases()
  const userUseCases = getUserUseCases()

  const user = GetAuthenticatedUser()

  const fetchData = async (): Promise<void> => {
    try {
      const [courses, users] = await Promise.all([
        courseUseCases.findAll(searchParams.get('active') !== 'false'),
        userUseCases.findAllByRole(true, 'coordenador'),
      ])
      setLoading(false)
      setCourses(courses)
      setUsers(users)
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

  const filteredCourses = useMemo(() => {
    const lowerCaseSearch = searchCourse.toLowerCase()
    return courses.filter((course) =>
      course.name.toLowerCase().includes(lowerCaseSearch),
    )
  }, [courses, searchCourse])

  function updateCourseState(Courses: Course[]): void {
    let newCourses: Course[]
    switch (searchParams.get('active')) {
      case 'false':
        newCourses = Courses.filter((course) => course.active === false)
        setCourses(newCourses)
        return
      default:
        newCourses = Courses.filter((course) => course.active === true)
        setCourses(newCourses)
    }
  }

  async function handleCreateCourse(course: CreatedCourse): Promise<void> {
    try {
      const data = await courseUseCases.create(course)
      updateCourseState([...courses, data])
      Toast({ message: 'Curso criado com sucesso!', type: 'success' })
      setCreateCourseModal(false)
      setFormErros([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        setFormErros(err.errors)
        Toast({ message: err.message, type: err.type })
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleEditCourse(course: Course): Promise<void> {
    try {
      const newCourse = await courseUseCases.updateById(course)
      const updatedCourses = courses.map((course) =>
        course.id === newCourse.id ? newCourse : course,
      )
      updateCourseState(updatedCourses)
      Toast({ message: 'Curso atualizado com sucesso!', type: 'success' })
      setCourseToEdit(undefined)
      setFormErros([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        setFormErros(err.errors)
        Toast({ message: err.message, type: err.type })
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteCourse(id: string): Promise<void> {
    try {
      await courseUseCases.deleteById(id)
      const newCourses = courses.filter((course) => course.id !== id)
      setCourses(newCourses)
      Toast({ message: 'Curso excluído com sucesso!', type: 'success' })
      setCourseToDelete(undefined)
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        Toast({ message: err.message, type: err.type })
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  const filteredData = !searchCourse ? courses : filteredCourses

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitleWrapper>
          {user?.role.startsWith('DIRETOR') && (
            <BreadCrumb crumbs={[{ title: 'Início' }, { title: 'Cursos' }]} />
          )}
          <PageTitle>Gestão de cursos</PageTitle>
        </PageTitleWrapper>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por cursos"
              onChange={(event) => setSearchCourse(event.target.value)}
            />
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              onClick={() => setCreateCourseModal(true)}
            >
              Criar curso
              <PlusCircle size={18} color="#FFFFFF" weight="bold" />
            </MainButton>
          </MainOptions>
          <FilterContainer>
            <OptionsContainer>
              <FilterOption
                label="Cursos Ativos"
                param="active"
                value="true"
                defaultChecked={true}
              />
              <FilterOption
                label="Cursos Inativo"
                param="active"
                value="false"
              />
            </OptionsContainer>
          </FilterContainer>
        </PageHeader>
        {createCourseModal && (
          <CreateCourseModal
            users={users.filter((user) => user.roles === 'COORDENADOR')}
            show={createCourseModal}
            handleCreateCourse={handleCreateCourse}
            possibleErrors={formErros}
            onHide={() => {
              setCreateCourseModal(false)
              setFormErros([])
            }}
          />
        )}
        {courseToView && (
          <CourseModal
            course={courseToView}
            show={!!courseToView}
            onHide={() => setCourseToView(undefined)}
          />
        )}
        {courseToEdit && (
          <EditCourseModal
            users={users.filter((user) => user.roles === 'COORDENADOR')}
            course={courseToEdit}
            show={!!courseToEdit}
            possibleErrors={formErros}
            onHide={() => {
              setCourseToEdit(undefined)
              setFormErros([])
            }}
            handleEditCourse={handleEditCourse}
          />
        )}
        {courseToDelete && (
          <DeleteCourseModal
            id={courseToDelete.id}
            name={courseToDelete.name}
            handleDeleteCourse={handleDeleteCourse}
            show={!!courseToDelete}
            onHide={() => setCourseToDelete(undefined)}
          />
        )}
        {courses.length === 0 && !loading && (
          <NoEntitiesFound
            message="Comece criando um novo curso ou redefinindo os filtros de busca"
            Icon={<ChalkboardTeacher size={32} color="#645C5A" weight="fill" />}
          />
        )}
        <PageLoader loading={loading} />
        {!loading && filteredData.length > 0 && (
          <MainTable headers={['Nome', 'Coordenador', 'Horário', 'Ações']}>
            {filteredData
              .sort((current, next) => current.name.localeCompare(next.name))
              .map((course) => (
                <MainTableRow
                  key={course.id}
                  entityData={[
                    course.name,
                    course.coordinator,
                    course.schedule.join(', '),
                  ]}
                  viewEntity={() => setCourseToView(course)}
                  editEntity={() => setCourseToEdit(course)}
                  deleteEntity={() => setCourseToDelete(course)}
                />
              ))}
          </MainTable>
        )}
      </PageContainer>
    </>
  )
}
