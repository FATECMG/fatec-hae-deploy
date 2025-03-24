import { MainLoader } from '@/presentation/components'
import { PageLoaderContainer } from './Styles'
import { useEffect, useState } from 'react'

interface PageLoaderProps {
  loading: boolean
}

export default function PageLoader({ loading }: PageLoaderProps) {
  const [disableDisplay, setDisableDisplay] = useState<boolean>(false)

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDisableDisplay(true)
      }, 200)
    }
  }, [loading])

  return disableDisplay ? null : (
    <PageLoaderContainer loading={loading ? 1 : 0}>
      <MainLoader containerHeight="auto" />
    </PageLoaderContainer>
  )
}
