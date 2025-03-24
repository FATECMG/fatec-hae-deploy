import {
  MainTable,
  MainTableRow,
  NoEntitiesFound,
  PageContainer,
  PageHeader,
  PageLoader,
  PageTitle,
  SearchBar,
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
  EditReportModal,
  ViewReportModal,
} from '@/presentation/pages/reports/modals'
import { getAllUrlParams } from '@/presentation/utils/GetUrlParams'

import { CreateReport, Report } from '@/domain/report/entities/Report'

import { ToastContainer } from 'react-toastify'
import { File, PlusCircle } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { Project, projectStatus } from '@/domain/project/entities/Project'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { UnauthorizedError } from '@/main/error/UnathorizedError'
import { Alert } from '@/presentation/utils/SweetAlert'

export default function Reports() {
  document.title = 'Relatórios'

  const {
    isLoading,
    reports,
    modalState,
    changeToView,
    changeToSave,
    closeModal,
    handleEditReport,
    setIsLoading,
    setReports,
    findAll,
  } = useReport()
  const { projects, setProjects, findAll: findAllProjects } = useProject()
  const [projectNameFilter, setProjectNameFilter] = useState<string>('')
  const [displayReports, setDisplayReports] = useState(reports)
  const [projectsWithoutReport, setProjectsWithoutReport] = useState<Project[]>(
    [],
  )
  const {
    show: showCreate,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal()
  const logout = useLogout()

  const fetchData = async () => {
    try {
      const [reports, projects] = await Promise.all([
        findAll(true),
        findAllProjects(getAllUrlParams()),
      ])
      setReports(reports)
      setProjects(projects)
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
          </MainOptions>
        </PageHeader>

        {showCreate && (
          <CreateReportModal
            handleSave={async (report: CreateReport) => {
              handleEditReport(report)
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
        {modalState.data !== null && modalState.state === 'save' && (
          <EditReportModal
            report={modalState.data}
            show={modalState.data !== null}
            onHide={() => closeModal()}
            handleSave={async (report: CreateReport) => {
              handleEditReport(report)
              closeModal()
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
        <PageLoader loading={isLoading} />
        {!isLoading && displayReports.length === 0 && (
          <NoEntitiesFound
            message="Não há relatórios para exibir."
            Icon={<File size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!isLoading && displayReports.length > 0 && (
          <MainTable headers={['Título do Projeto', 'Autor', 'Ações']}>
            {displayReports.map((report) => (
              <MainTableRow
                key={report.id}
                entityData={[report.project.title, report.author.name]}
                viewEntity={() => changeToView(report)}
                editEntity={() => changeToSave(report)}
                showEntityIcon={true}
              />
            ))}
          </MainTable>
        )}
      </PageContainer>
    </>
  )
}
