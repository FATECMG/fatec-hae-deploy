import { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { File, Funnel } from 'phosphor-react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import {
  NoEntitiesFound,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchBar,
  ProjectTable,
  ProjectTableRow,
  PageLoader,
  BreadCrumb,
  PageTitleWrapper,
  Toast,
} from '@/presentation/components'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { PrettyButton } from '@/presentation/components/buttons/Styles'
import { getRenderIconByStatusAndRole } from '@/presentation/pages/projects/utils/getRenderIconByStatusAndRole'
import { MainOptions } from '@/presentation/pages/schools/Styles'
import { Status } from '@/presentation/pages/projects/utils/strategyIcon'
import { useReport, useLogout } from '@/presentation/hooks'
import { EditReportModal } from '@/presentation/pages/reports/modals'
import { getAllUrlParams } from '@/presentation/utils/GetUrlParams'
import { Alert } from '@/presentation/utils/SweetAlert'

import {
  ViewProjectModal,
  DeleteProjectModal,
  EditProjectModal,
  CommentsModal,
  SendProjectModal,
  EvaluateProjectModal,
  FilterProjectsModal,
} from './modals'

import { Project } from '@/domain/project/entities/Project'
import { Notice } from '@/domain/notice/entities/Notice'
import { createdComment } from '@/domain/comment/entities/Comment'

import { getProjectUseCases } from '@/main/factories/ProjectUseCaseFactory'
import { RequestError } from '@/main/error/RequestError'
import { getNoticeUseCases } from '@/main/factories/NoticeUseCaseFactory'
import { getCommentUseCases } from '@/main/factories/CommentUseCaseFactory'
import { UnauthorizedError } from '@/main/error/UnathorizedError'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export default function Projects() {
  document.title = 'Avaliar projetos'

  const [projects, setProjects] = useState<Project[]>([])
  const [searchProject, setsearchProject] = useState<string>('')
  const [projectToView, setProjectToView] = useState<Project>()
  const [loading, setLoading] = useState<boolean>(true)
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [projectToDelete, setProjectToDelete] = useState<Project>()
  const [projectComments, setProjectComments] = useState<Project>()
  const [projectToSend, setProjectToSend] = useState<Project>()
  const [projectToEvaluate, setProjectToEvaluate] = useState<Project>()
  const [notices, setNotices] = useState<Notice[]>([])
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false)
  const {
    changeToSave,
    reports: reportsState,
    modalState,
    closeModal,
    findAll: reportFindAll,
    setReports,
    handleEditReport,
  } = useReport()

  const projectUseCases = getProjectUseCases()
  const noticeUseCases = getNoticeUseCases()
  const commentUseCases = getCommentUseCases()

  const user = GetAuthenticatedUser()

  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const logout = useLogout()

  const fetchData = async (): Promise<void> => {
    try {
      const [projects, notices, reports] = await Promise.all([
        projectUseCases.findAllActive(getAllUrlParams()),
        noticeUseCases.findAll(true),
        reportFindAll(true),
      ])
      setLoading(false)
      setProjects(projects)
      setNotices(notices)
      setReports(reports)
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
  }, [location.search])

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
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleEvaluateProject(
    id: string,
    status: string,
    showToast?: boolean,
  ): Promise<void | JSX.Element> {
    try {
      const response = await projectUseCases.evaluateProject(id, status)
      const newProjects = projects.map((project) =>
        project.id === response.id ? response : project,
      )
      setProjects(newProjects)
      setProjectToEvaluate(undefined)
      showToast ??
        Toast({ message: 'Projeto avaliado com sucesso!', type: 'success' })
    } catch (error: unknown) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
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

  function createCommentByProjectEvaluation(
    projectId: string,
    status: string,
    comment: string | undefined,
  ) {
    handleEvaluateProject(projectId, status)
    if (comment)
      handleCreateComment(projectId, {
        author: { id: user!.id, name: user!.name },
        content: comment,
      })
  }

  const handleApplyFilters = (url: string) => {
    setShowFiltersModal(false)
    navigate('/projetos?' + url)
  }

  const filteredProjects = useMemo(() => {
    const lowerCaseSearch = searchProject.toLowerCase()
    console.log(projects)
    return projects.filter((project) =>
      project.title.toLowerCase().includes(lowerCaseSearch) || project.author.name.toLowerCase().includes(lowerCaseSearch) || project.notice.title.toLowerCase().includes(lowerCaseSearch)
    )
  }, [searchProject, projects])

  const orderProjectsByFilters = (projects: Project[]): Project[] => {
    switch (searchParams.get('ordenarPor')) {
      case 'name':
        return projects.sort((current, next) =>
          current.title.localeCompare(next.title),
        )
      case 'status':
        return projects.sort((current, next) =>
          current.status.localeCompare(next.status),
        )
      case 'author':
        return projects.sort((current, next) =>
          current.author.name.localeCompare(next.author.name),
        )
      default:
        return projects
    }
  }

  const getPDF = async (projects: Project[]) => {
    try {
      // Criar PDF
      const pdfDoc = await PDFDocument.create();

      // Adicionar uma página ao PDF
      const page = pdfDoc.addPage([595, 842]);

      // Fonte
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Estilo Texto
      const size = 12;
      let y = 800;

      // Título
      page.drawText("Relatório de Projetos", 
        {
          x: 50,
          y: y,
          size: 14,
          font,
          color: rgb(0, 0, 0)
        }
      );

      y -= 30;

      // Cabeçalho
      page.drawText("# Título       Docente                  Horas       Edital                    Data", 
        {
          x: 50,
          y: y,
          size: size,
          font,
          color: rgb(0, 0, 0)
        }
      );

      // Dados dos projetos
      projects.forEach((project, index) => {
        const linha = `${index+1} ${project.title} ${project.author} ${project.hours} ${project.notice.title} ${project.sendDate}`;
        page.drawText(linha, {
          x: 50,
          y: y,
          size: size,
          font,
          color: rgb(0, 0, 0)
        });
        y -= 20;
      });

      // Salvar PDF
      const pdfBytes = await pdfDoc.save();

      // Baixar arquivo
      const blob = new Blob([pdfBytes], {type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio-projetos.pdf";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar PDF: ", error);
      alert("Erro ao gerar PDF!");
    }
  };

  const setReportToShow = (project: Project) => {
    const report = reportsState.find(
      (report) => report?.project?.id === project.id,
    )
    changeToSave({
      activities: report?.activities ?? [],
      project: {
        id: project.id,
        title: project.title,
      },
      active: true,
      author: {
        id: user?.id ?? '',
        name: user?.name ?? '',
      },
      id: report?.id ?? '',
      status: 'EM ANDAMENTO',
    })
  }

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitleWrapper>
          {user?.role.startsWith('DIRETOR') && (
            <BreadCrumb
              crumbs={[{ title: 'Início' }, { title: 'Avaliar projetos' }]}
            />
          )}
          <PageTitle>Avaliar projetos</PageTitle>
        </PageTitleWrapper>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por projetos"
              onChange={(event) => setsearchProject(event.target.value)}
            />
            <PrettyButton
              title="Clique para filtrar projetos"
              onClick={() => setShowFiltersModal(true)}
            >
              Filtros
              <Funnel size={18} weight="bold" />
            </PrettyButton>
            <PrettyButton
              title="Clique gerar o PDF dos projetos"
              onClick={() => getPDF(filteredProjects)}
            >
              PDF
              <File size={18} weight="bold" />
            </PrettyButton>
          </MainOptions>
        </PageHeader>
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
        {projectToEvaluate && (
          <EvaluateProjectModal
            projectId={projectToEvaluate.id}
            title={projectToEvaluate.title}
            show={!!projectToEvaluate}
            onHide={() => setProjectToEvaluate(undefined)}
            handleEvaluateProject={createCommentByProjectEvaluation}
          />
        )}
        {showFiltersModal && (
          <FilterProjectsModal
            show={showFiltersModal}
            onHide={() => setShowFiltersModal(false)}
            handleApplyFilters={handleApplyFilters}
          />
        )}
        {modalState.data !== null && modalState.state === 'save' && (
          <EditReportModal
            report={modalState.data}
            show={modalState.data !== null}
            onHide={() => closeModal()}
            handleSave={handleEditReport}
          />
        )}
        <PageLoader loading={loading} />
        {projects.length === 0 && !loading && (
          <NoEntitiesFound
            message="Nenhum projeto encontrado, redefina os filtros de busca ou aguarde o envio de projetos"
            Icon={<File size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!loading && filteredProjects.length > 0 && (
          <ProjectTable>
            {orderProjectsByFilters(filteredProjects).map((project) => {
              const shouldRender = getRenderIconByStatusAndRole(
                project.status,
                user?.role,
              )

              return (
                <ProjectTableRow
                  key={project.id}
                  name={project.title}
                  author={project.author.name}
                  sendDate={project.sendDate}
                  cardStatus={project.status}
                  titleDiv="Clique para visualizar todas as informações do projeto"
                  altEdit="Clique para editar as informações do projeto"
                  altDelete="Clique para deletar o projeto"
                  viewEntity={() => {
                    if (Status.IsSent(project.status))
                      handleEvaluateProject(project.id, 'EM VALIDAÇÃO', false)
                    setProjectToView(project)
                  }}
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
                  viewComments={
                    shouldRender.Icon.COMMENTS
                      ? () => setProjectComments(project)
                      : undefined
                  }
                  evaluateProject={
                    shouldRender.Icon.EVALUATE
                      ? () => setProjectToEvaluate(project)
                      : undefined
                  }
                  reportProject={
                    shouldRender.Icon.REPORT
                      ? () => setReportToShow(project)
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
