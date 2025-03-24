type Status = string

interface Author {
  id: string
  name: string
}

interface Project {
  id: string
  title: string
}

export interface Activity {
  description: string
}

export interface Report {
  id?: string
  author: Author
  project: Project
  activities: Activity[]
  status: Status
  active: boolean
  images?: string[]
}

export interface CreateActivity {
  description: string
}

export interface CreateReport {
  projectId: string
  activities: CreateActivity[]
  files: File[]
}
