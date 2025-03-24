import { useEffect } from 'react'

import {
  PageContainer,
  PageLoader,
  StatisticCard,
  StatisticCardWithPieChart,
} from '@/presentation/components'

import {
  HomeHeader,
  HomeWelcomeMessageTitle,
  StatisticColumn,
  StatisticsContainer,
  UpdateIcon,
  UpdateStatisticsButton,
  UpdateStatisticsContainer,
} from './Styles'

import { ToastContainer } from 'react-toastify'
import {
  ChalkboardTeacher,
  ClipboardText,
  Lightbulb,
  NewspaperClipping,
} from 'phosphor-react'
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js'
import { useStatistic } from '@/presentation/hooks'

import { DateTime } from 'luxon'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  const {
    handleUpdateStatistics,
    handleGetStatistics,
    loading,
    statistics,
    isStatisticsUpdating,
  } = useStatistic()

  useEffect(() => {
    handleGetStatistics()
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatDate = (date: string) => {
    const newDate = DateTime.fromISO(date)
    return newDate.toFormat('dd/MM, HH:mm')
  }

  const projectTotal =
    statistics.general.approvedProjects +
    statistics.general.rejectedProjects +
    statistics.general.pendingProjects

  const user = GetAuthenticatedUser()

  function capitalizeFirstAndLastName(fullName: string) {
    const firstAndSecondName = fullName.split(' ').slice(0, 2).join(' ')

    return firstAndSecondName
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <HomeHeader>
          <HomeWelcomeMessageTitle>
            Bem vindo (a) {user && `, ${capitalizeFirstAndLastName(user.name)}`}
          </HomeWelcomeMessageTitle>
          <UpdateStatisticsContainer>
            <div>
              <h2>Clique para atualizar o dashboard</h2>
              <p>
                Última atualização:{' '}
                {isStatisticsUpdating()
                  ? 'atualizando...'
                  : formatDate(statistics.updatedAt)}
              </p>
            </div>
            <UpdateStatisticsButton
              onClick={handleUpdateStatistics}
              disabled={isStatisticsUpdating()}
            >
              <UpdateIcon
                size={14}
                weight="bold"
                animate={isStatisticsUpdating() ? 1 : 0}
              />
            </UpdateStatisticsButton>
          </UpdateStatisticsContainer>
        </HomeHeader>
        <StatisticsContainer>
          <StatisticColumn>
            <StatisticCard
              statistic={statistics.general.totalProjects}
              title="Projetos submetidos e rascunhos"
              icon={<ClipboardText size={20} color="#36a3eb" weight="fill" />}
              iconBgColor="54, 162, 235"
            />
            <StatisticCard
              statistic={statistics.topicStatistics.total}
              title="Tópicos de interesse"
              icon={<Lightbulb size={20} color="#ff6384" weight="fill" />}
              iconBgColor="255, 99, 132"
            />
          </StatisticColumn>
          <StatisticColumn>
            <StatisticCard
              statistic={statistics.noticeStatistics.total}
              title="Editais"
              icon={
                <NewspaperClipping size={20} color="#ffce56" weight="fill" />
              }
              iconBgColor="255, 206, 86"
            />
            <StatisticCard
              statistic={statistics.courseStatistics.total}
              title="Cursos"
              icon={
                <ChalkboardTeacher size={20} color="#32CD32" weight="fill" />
              }
              iconBgColor="50,205,50"
            />
          </StatisticColumn>
          <StatisticCardWithPieChart
            title="Situação dos projetos - não rascunhos"
            total={projectTotal}
            statistics={[
              statistics.general.approvedProjects,
              statistics.general.rejectedProjects,
              statistics.general.pendingProjects,
            ]}
            labels={[
              'projetos aprovados',
              'projetos rejeitados',
              'projetos pendentes de avaliação',
            ]}
            chartConfig={{
              labels: [
                'Projetos rejeitados',
                'Projetos aprovados',
                'Projetos pendentes de avaliação',
              ],
              datasets: [
                {
                  label: 'Quantidade',
                  data: [
                    statistics.general.rejectedProjects,
                    statistics.general.approvedProjects,
                    statistics.general.pendingProjects,
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 2,
                },
              ],
            }}
          />
          <StatisticCardWithPieChart
            title="Projetos por curso"
            total={statistics.general.totalProjects}
            statistics={statistics.courseStatistics.statistics.map(
              (course) => course.totalProjects,
            )}
            labels={statistics.courseStatistics.statistics.map(
              (course) => course.courseName,
            )}
            chartConfig={{
              labels: statistics.courseStatistics.statistics.map(
                (course) => course.courseName,
              ),
              datasets: [
                {
                  label: 'Quantidade',
                  data: statistics.courseStatistics.statistics.map(
                    (course) => course.totalProjects,
                  ),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 2,
                },
              ],
            }}
          />
        </StatisticsContainer>
        <StatisticsContainer>
          <StatisticCardWithPieChart
            title="Situação dos projetos - relatórios"
            total={projectTotal}
            statistics={[
              statistics.general.projectsWithReport,
              statistics.general.projectsWithoutReport,
            ]}
            labels={['projetos com relatório', 'projetos sem relatório']}
            chartConfig={{
              labels: ['projetos com relatório', 'projetos sem relatório'],
              datasets: [
                {
                  label: 'Quantidade',
                  data: [
                    statistics.general.projectsWithReport,
                    statistics.general.projectsWithoutReport,
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 2,
                },
              ],
            }}
          />
        </StatisticsContainer>
        <PageLoader loading={loading} />
      </PageContainer>
    </>
  )
}
