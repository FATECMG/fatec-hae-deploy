import { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { File, PlusCircle } from 'phosphor-react'

import {
  NoEntitiesFound,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchBar,
  Toast,
  PageLoader,
  ProjectTable,
  ProjectTableRow,
  BreadCrumb,
  PageTitleWrapper,
} from '@/presentation/components'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { getRenderIconByStatusAndRole } from '@/presentation/pages/projects/utils/getRenderIconByStatusAndRole'
import { MainOptions } from '@/presentation/pages/schools/Styles'
import { useLogout } from '@/presentation/hooks'

import {
  ViewProjectModal,
  CreateProjectModal,
  DeleteProjectModal,
  EditProjectModal,
  CommentsModal,
  SendProjectModal,
} from './modals'

import { Project, createdProject } from '@/domain/project/entities/Project'
import { Notice } from '@/domain/notice/entities/Notice'
import { User } from '@/domain/user/entities/User'

import { getProjectUseCases } from '@/main/factories/ProjectUseCaseFactory'
import { RequestError, errorsField } from '@/main/error/RequestError'
import { getNoticeUseCases } from '@/main/factories/NoticeUseCaseFactory'
import { getCommentUseCases } from '@/main/factories/CommentUseCaseFactory'
import { createdComment } from '@/domain/comment/entities/Comment'
import { getUserUseCases } from '@/main/factories'
import { UnauthorizedError } from '@/main/error/UnathorizedError'
import { Alert } from '@/presentation/utils/SweetAlert'

export default function MyProjects() {
  document.title = 'Meus projetos'

  const [projects, setProjects] = useState<Project[]>([])
  const [searchProject, setsearchProject] = useState<string>('')
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [projectToView, setProjectToView] = useState<Project>()
  const [loading, setLoading] = useState<boolean>(true)
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [projectToDelete, setProjectToDelete] = useState<Project>()
  const [projectComments, setProjectComments] = useState<Project>()
  const [projectToSend, setProjectToSend] = useState<Project>()
  const [notices, setNotices] = useState<Notice[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [searchParams] = useSearchParams()

  const projectUseCases = getProjectUseCases()
  const noticeUseCases = getNoticeUseCases()
  const commentUseCases = getCommentUseCases()
  const userUseCases = getUserUseCases()

  const user = GetAuthenticatedUser()
  const logout = useLogout()

  const fetchData = async (): Promise<void> => {
    try {
      const [projects, notices, users] = await Promise.all([
        projectUseCases.findAllByAuthor(user!.id),
        noticeUseCases.findAll(true),
        userUseCases.findAll(true),
      ])

      setLoading(false)
      setProjects(projects)
      setNotices(notices)
      setUsers(users)
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('status')])

  async function handleCreateProject(project: createdProject): Promise<void> {
    const createProject = (): Promise<void> => {
      Toast({
        message: 'Projeto criado com sucesso!',
        type: 'success',
      })
      setCreateModal(false)
      return Promise.resolve()
    }

    try {
      const response = await projectUseCases.save(project)
      setProjects([...projects, response])
      createProject().then(() =>
        Toast({
          message:
            'O projeto foi criado como rascunho, clique no ícone ✈️ do cartão para enviar!',
          type: 'custom',
          icon: '📄',
        }),
      )
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleEditProject(project: Project): Promise<void> {
    try {
      const response = await projectUseCases.updateById(project)
      const newProjects = projects.map((project) =>
        project.id === response.id ? response : project,
      )
      setProjects(newProjects)
      Toast({ message: 'Projeto atualizado com sucesso!', type: 'success' })
      setProjectToEdit(undefined)
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteProject(id: string): Promise<void> {
    try {
      await projectUseCases.deleteById(id)
      const filteredProjects = projects.filter((project) => project.id !== id)
      setProjects(filteredProjects)
      Toast({ message: 'Projeto deletado com sucesso!', type: 'success' })
      setProjectToDelete(undefined)
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleSubmitProject(id: string): Promise<void> {
    try {
      const response = await projectUseCases.submitProject(id)
      const newProjects = projects.map((project) =>
        project.id === response.id ? response : project,
      )
      setProjects(newProjects)
      setProjectToSend(undefined)
      Toast({ message: 'Projeto enviado com sucesso!', type: 'success' })
    } catch (error: unknown) {
      error instanceof UnauthorizedError && Alert.disconnected(logout)

      if (error instanceof RequestError) {
        const errors = error.errors

        if (hasError(errors)) {
          errors.forEach((err) => {
            let message = err.message
            if (err.field === 'sendDate') {
              message =
                'A data de envio de projetos para esse edital já está fechada!'
            }
            Toast({ message, type: 'warning' })
          })
        } else {
          Toast({ message: error.message, type: error.type })
        }
      }
    }

    function hasError(
      errors: errorsField[] | undefined,
    ): errors is errorsField[] {
      return errors !== undefined
    }
  }

  async function handleCreateComment(
    projectId: string,
    comment: createdComment,
  ): Promise<void> {
    try {
      const response = await commentUseCases.createComment(projectId, comment)
      const newProjects = projects.map((project) => {
        if (project.id === projectId) {
          project.comments.push(response)
        }
        return project
      })
      setProjects(newProjects)
    } catch (error) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  const filteredProjects = useMemo(() => {
    const lowerCaseSearch = searchProject.toLowerCase()
    return projects.filter((project) =>
      project.title.toLowerCase().includes(lowerCaseSearch),
    )
  }, [searchProject, projects])

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitleWrapper>
          {user?.role.startsWith('DIRETOR') && (
            <BreadCrumb
              crumbs={[{ title: 'Início' }, { title: 'Meus projetos' }]}
            />
          )}
          <PageTitle>Meus projetos</PageTitle>
        </PageTitleWrapper>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por projetos"
              onChange={(event) => setsearchProject(event.target.value)}
            />
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              onClick={() => setCreateModal(true)}
            >
              Criar projeto
              <PlusCircle size={18} color="#FFFFFF" weight="bold" />
            </MainButton>
          </MainOptions>
        </PageHeader>
        {createModal && (
          <CreateProjectModal
            users={users.filter((user) => user.roles !== 'ADMINISTRADOR')}
            notices={notices}
            handleCreateProject={handleCreateProject}
            show={createModal}
            onHide={() => setCreateModal(false)}
          />
        )}
        {projectToEdit && (
          <EditProjectModal
            project={projectToEdit}
            notices={notices}
            handleEditProject={handleEditProject}
            show={!!projectToEdit}
            onHide={() => setProjectToEdit(undefined)}
          />
        )}
        {projectToView && (
          <ViewProjectModal
            project={projectToView}
            show={!!projectToView}
            onHide={() => setProjectToView(undefined)}
          />
        )}
        {projectToDelete && (
          <DeleteProjectModal
            projectId={projectToDelete.id}
            title={projectToDelete.title}
            handleDeleteProject={handleDeleteProject}
            show={!!projectToDelete}
            onHide={() => setProjectToDelete(undefined)}
          />
        )}
        {projectComments && (
          <CommentsModal
            projectId={projectComments.id}
            comments={projectComments.comments
              .slice(0)
              .reverse()
              .map((comment) => comment)}
            handleCreateComment={handleCreateComment}
            show={!!projectComments}
            onHide={() => setProjectComments(undefined)}
          />
        )}
        {projectToSend && (
          <SendProjectModal
            projectId={projectToSend.id}
            title={projectToSend.title}
            handleSendProject={() => handleSubmitProject(projectToSend.id)}
            show={!!projectToSend}
            onHide={() => setProjectToSend(undefined)}
          />
        )}
        <PageLoader loading={loading} />
        {projects.length === 0 && !loading && (
          <NoEntitiesFound
            message="Comece criando um novo projeto"
            Icon={<File size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!loading && filteredProjects.length > 0 && (
          <ProjectTable showAuthor={false}>
            {filteredProjects
              .sort((current, next) => current.title.localeCompare(next.title))
              .map((project) => {
                const shouldRender = getRenderIconByStatusAndRole(
                  project.status,
                  user?.role,
                )
                return (
                  <ProjectTableRow
                    key={project.id}
                    name={project.title}
                    sendDate={project.sendDate}
                    cardStatus={project.status}
                    titleDiv="Clique para visualizar todas as informações do projeto"
                    altEdit="Clique para editar as informações do projeto"
                    altDelete="Clique para deletar o projeto"
                    viewEntity={() => setProjectToView(project)}
                    viewComments={
                      shouldRender.Icon.COMMENTS
                        ? () => setProjectComments(project)
                        : undefined
                    }
                    editEntity={
                      shouldRender.Icon.EDIT
                        ? () => setProjectToEdit(project)
                        : undefined
                    }
                    deleteEntity={
                      shouldRender.Icon.DELETE
                        ? () => setProjectToDelete(project)
                        : undefined
                    }
                    submitProject={
                      shouldRender.Icon.SUBMIT
                        ? () => setProjectToSend(project)
                        : undefined
                    }
                  />
                )
              })}
          </ProjectTable>
        )}
      </PageContainer>
    </>
  )
}
