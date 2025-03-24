interface General {
  totalProjects: number
  projectsWithReport: number
  projectsWithoutReport: number
  approvedProjects: number
  rejectedProjects: number
  pendingProjects: number
  draftProjects: number
}

interface NoticeStatistic {
  noticeId: string
  noticeTitle: string
  totalProjects: number
  approvedProjects: number
  rejectedProjects: number
  totalHours: number
  approvedHours: number
  pendingJudgementHours: number
  freeHours: number
}

interface TopicStatistic {
  topicName: string
  totalProjects: number
}

interface CourseStatistic {
  courseName: string
  totalProjects: number
  approvedProjects: number
  rejectedProjects: number
  pendingProjects: number
}

interface StatisticsWithTotal<T> {
  total: number
  statistics: Array<T>
}

export interface Statistics {
  status: string
  updatedAt: string
  general: General
  noticeStatistics: StatisticsWithTotal<NoticeStatistic>
  topicStatistics: StatisticsWithTotal<TopicStatistic>
  courseStatistics: StatisticsWithTotal<CourseStatistic>
}

export const EmptyStatistics: Statistics = {
  status: 'ready',
  updatedAt: new Date().toISOString(),
  general: {
    approvedProjects: 0,
    totalProjects: 0,
    draftProjects: 0,
    pendingProjects: 0,
    projectsWithoutReport: 0,
    projectsWithReport: 0,
    rejectedProjects: 0,
  },
  courseStatistics: {
    total: 0,
    statistics: [],
  },
  noticeStatistics: {
    total: 0,
    statistics: [],
  },
  topicStatistics: {
    total: 0,
    statistics: [],
  },
}
