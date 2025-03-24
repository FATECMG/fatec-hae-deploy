export interface Course {
  id: string
  name: string
  acronym: string
  code: string
  schedule: string[]
  coordinator: string
  active: boolean
}

export interface CreatedCourse extends Omit<Course, 'id'> {}
