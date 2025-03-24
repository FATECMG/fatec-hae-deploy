import { useState } from 'react'

import {
  EmptyStatistics,
  Statistics,
} from '@/domain/statistics/entities/Statistics'

import { RequestError } from '@/main/error/RequestError'
import { getStatisticsUseCases } from '@/main/factories/StatisticsUseCaseFactory'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { Toast } from '@/presentation/components'
import { Alert } from '@/presentation/utils/SweetAlert'
import { useLogout } from '@/presentation/hooks'

enum StatisticsStatus {
  ready = 'ready',
  updating = 'updating',
}

interface useStatisticProps {
  statistics: Statistics
  loading: boolean
  handleGetStatistics: () => Promise<void>
  handleUpdateStatistics: () => Promise<void>
  isStatisticsUpdating: () => boolean
}

export function useStatistic(): useStatisticProps {
  const [statistics, setStatistics] = useState<Statistics>(EmptyStatistics)
  const [loading, setLoading] = useState<boolean>(true)
  const logout = useLogout()

  const statisticsUseCases = getStatisticsUseCases()

  async function handleGetStatistics() {
    try {
      const response = await statisticsUseCases.getStatistics()
      setStatistics(response)
    } catch (error: unknown) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateStatistics() {
    try {
      updateStatisticsStatus(StatisticsStatus.updating)
      await statisticsUseCases.updateStatistics()
      handleGetStatistics()
      updateStatisticsStatus(StatisticsStatus.ready)
      Toast({
        message: 'Dashboard atualizado com sucesso!',
        type: 'success',
      })
    } catch (error: unknown) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  const updateStatisticsStatus = (status: StatisticsStatus) =>
    setStatistics({ ...statistics, status })

  const isStatisticsUpdating = () =>
    statistics.status === StatisticsStatus.updating

  return {
    statistics,
    loading,
    handleGetStatistics,
    handleUpdateStatistics,
    isStatisticsUpdating,
  }
}
