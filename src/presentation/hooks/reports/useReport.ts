import { CreateReport, Report } from '@/domain/report/entities/Report'

import { RequestError } from '@/main/error/RequestError'
import { getReportUseCases } from '@/main/factories'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { Alert } from '@/presentation/utils/SweetAlert'
import { Toast } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

import { useReducer, useState } from 'react'
import { User } from '@/domain/user/entities/User'
import { Roles } from '@/domain/role/entities/Role'
import { Root } from 'react-dom/client'
import { rootReducerProps } from '@/config/redux/RootReducer'
import { useSelector } from 'react-redux'

type ReportModal = 'save' | 'view' | 'edit' | 'send' | 'delete' | null

interface ReportModalState {
  state: ReportModal
  data: Report | null
}

export function useReport() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalState, setModalState] = useState<ReportModalState>({
    state: null,
    data: null,
  })
  const logout = useLogout()

  const user = useSelector((root: rootReducerProps) => root.userReducer.user)

  const useCase = getReportUseCases()

  function convertReportToCreateReport(report: Report): CreateReport {
    return {
      projectId: report.project.id,
      activities: report.activities.map((activity) => ({
        description: activity.description,
      })),
      files: [],
    }
  }

  async function handleFindAllReports(): Promise<void> {
    try {
      let response

      if (user!.role!.includes(Roles.TEACHER)) {
        response = await useCase.findAllByAuthor()
      } else {
        response = await useCase.findAll(true)
      }

      setReports(response)
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSaveReport(report: CreateReport): Promise<void> {
    try {
      await useCase.save(report)
      await handleFindAllReports()
      Toast({
        message: 'Relatório criado com sucesso!',
        type: 'success',
      })
      Toast({
        message:
          'O relatório foi criado como rascunho, clique no ícone ✈️ na tabela para enviar!',
        type: 'custom',
        icon: '📄',
      })
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleEditReport(report: CreateReport): Promise<void> {
    try {
      await useCase.update(report)
      await handleFindAllReports()
      Toast({
        message: 'Relatório atualizado com sucesso!',
        type: 'success',
      })
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleSubmitReport(id: string): Promise<void> {
    try {
      await useCase.submitReport(id)
      await handleFindAllReports()
      Toast({
        message: 'Relatório enviado com sucesso!',
        type: 'success',
      })
      closeModal()
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteReport(id: string): Promise<void> {
    try {
      await useCase.deleteReport(id)
      await handleFindAllReports()
      Toast({
        message: 'Relatório deletado com sucesso!',
        type: 'success',
      })
      closeModal()
    } catch (err) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  function changeToView(report: Report) {
    setModalState({ state: 'view', data: report })
  }

  function changeToSave(report: Report) {
    setModalState({ state: 'save', data: report })
  }

  function changeToEdit(report: Report) {
    setModalState({ state: 'edit', data: report })
  }

  function changeToSend(report: Report) {
    setModalState({ state: 'send', data: report })
  }

  function changeToDelete(report: Report) {
    setModalState({ state: 'delete', data: report })
  }

  function closeModal() {
    setModalState({ data: null, state: null })
  }

  return {
    reports,
    isLoading,
    findAll: useCase.findAll.bind(useCase),
    setIsLoading,
    modalState,
    convertReportToCreateReport,
    closeModal,
    changeToSave,
    changeToView,
    changeToEdit,
    setReports,
    changeToSend,
    handleFindAllReports,
    handleSaveReport,
    handleSubmitReport,
    handleDeleteReport,
    changeToDelete,
    handleEditReport,
  }
}
