import {
  MainTable,
  ReportTableRow,
  NoEntitiesFound,
  PageContainer,
  PageHeader,
  PageLoader,
  PageTitle,
  SearchBar,
  ReportTable,
} from '@/presentation/components'
import {
  useReport,
  useProject,
  useModal,
  useLogout,
} from '@/presentation/hooks'
import { MainOptions } from '@/presentation/pages/schools/Styles'
import {
  CreateReportModal,
  DeleteReportModal,
  EditReportModal,
  SendReportModal,
  ViewReportModal,
} from '@/presentation/pages/reports/modals'

import { CreateReport, Report } from '@/domain/report/entities/Report'

import { ToastContainer } from 'react-toastify'
import { File, PlusCircle } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { Project, projectStatus } from '@/domain/project/entities/Project'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { UnauthorizedError } from '@/main/error/UnathorizedError'
import { Alert } from '@/presentation/utils/SweetAlert'
import { getProjectUseCases } from '@/main/factories/ProjectUseCaseFactory'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'

export default function MyReports() {
  document.title = 'Relatórios'

  const {
    isLoading,
    reports,
    modalState,
    changeToView,
    closeModal,
    handleSaveReport,
    setIsLoading,
    setReports,
    handleFindAllReports,
    handleSubmitReport,
    changeToSend,
    handleDeleteReport,
    changeToDelete,
  } = useReport()
  const { projects, setProjects } = useProject()
  const [projectNameFilter, setProjectNameFilter] = useState<string>('')
  const [displayReports, setDisplayReports] = useState(reports)
  const [projectsWithoutReport, setProjectsWithoutReport] = useState<Project[]>(
    [],
  )
  const projectUseCases = getProjectUseCases()
  const user = GetAuthenticatedUser()

  const {
    show: showCreate,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal()
  const logout = useLogout()

  const fetchData = async () => {
    try {
      const [, projects] = await Promise.all([
        handleFindAllReports(),
        projectUseCases.findAllByAuthor(user!.id),
      ])

      setProjects(
        projects.filter((project) => project.status === projectStatus.APPROVED),
      )
    } catch (err) {
      err instanceof UnauthorizedError && Alert.disconnected(logout)

      setReports([])
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjectsWithoutReport = useCallback(() => {
    const projectsWithReport = reports.map((report) => report.project.id)
    const result = projects
      .filter((project) => project.status === projectStatus.APPROVED)
      .filter((project) => !projectsWithReport.includes(project.id))

    return result
  }, [projects, reports])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setProjectsWithoutReport(filterProjectsWithoutReport())
  }, [projects, reports, filterProjectsWithoutReport])

  useEffect(() => {
    if (projectNameFilter !== '') {
      setDisplayReports(
        reports.filter((report) =>
          report.project.title
            .toLowerCase()
            .includes(projectNameFilter.toLowerCase()),
        ),
      )
    } else {
      setDisplayReports(reports)
    }
  }, [projectNameFilter, reports])

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitle>Relatórios</PageTitle>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar relatórios pelo título do projeto"
              onChange={(event) => setProjectNameFilter(event.target.value)}
            />
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              onClick={() => openCreateModal()}
            >
              Criar Relátorio
              <PlusCircle size={18} color="#FFFFFF" weight="bold" />
            </MainButton>
          </MainOptions>
        </PageHeader>

        {showCreate && (
          <CreateReportModal
            handleSave={async (report: CreateReport) => {
              await handleSaveReport(report)
              closeCreateModal()
            }}
            onHide={() => closeCreateModal()}
            show={showCreate}
            projects={projectsWithoutReport.map((each) => {
              return {
                id: each.id,
                title: each.title,
              }
            })}
          />
        )}
        {modalState.data !== null && modalState.state === 'edit' && (
          <EditReportModal
            report={modalState.data}
            show={modalState.data !== null}
            onHide={() => closeModal()}
            handleSave={async (report: CreateReport) => {
              await handleSaveReport(report)
            }}
          />
        )}
        {modalState.data !== null && modalState.state === 'view' && (
          <ViewReportModal
            report={modalState.data as Report}
            show={modalState.data !== null}
            onHide={() => closeModal()}
          />
        )}
        {modalState.data !== null && modalState.state === 'send' && (
          <SendReportModal
            title={modalState.data.project.title}
            show={modalState.data !== null}
            onHide={() => closeModal()}
            handleSendProject={() => handleSubmitReport(modalState.data!.id!)}
          />
        )}
        {modalState.data !== null && modalState.state === 'delete' && (
          <DeleteReportModal
            title={modalState.data.project.title}
            show={modalState.data !== null}
            onHide={() => closeModal()}
            handleDeleteProject={() => handleDeleteReport(modalState.data!.id!)}
          />
        )}
        <PageLoader loading={isLoading} />
        {!isLoading && displayReports.length === 0 && (
          <NoEntitiesFound
            message="Não há relatórios para exibir."
            Icon={<File size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!isLoading && displayReports.length > 0 && (
          <ReportTable>
            {displayReports.map((report) => (
              <ReportTableRow
                key={report.id}
                name={report.project.title}
                cardStatus={report.status}
                viewEntity={() => changeToView(report)}
                {...(report.status === 'RASCUNHO' && {
                  submitReport: () => changeToSend(report),
                })}
                {...(report.status === 'RASCUNHO' && {
                  deleteEntity: () => changeToDelete(report),
                })}
                titleDiv="Clique para ver todas as informações do relatório"
              />
            ))}
          </ReportTable>
        )}
      </PageContainer>
    </>
  )
}
