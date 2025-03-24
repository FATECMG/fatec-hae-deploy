interface NoticeCourse {
  id: string
  name: string
}

export interface Notice {
  id: string
  title: string
  active: boolean
  description: string
  topicsOfInterest: string[]
  semester: string
  year: string
  openDate: string
  closeDate: string
  evaluationEndDate: string
  course: NoticeCourse
}

export interface CreatedNotice extends Omit<Notice, 'id' | 'active'> {
  course: NoticeCourse
}
