import { Project } from '@/domain/project/entities/Project'

import { getProjectUseCases } from '@/main/factories/ProjectUseCaseFactory'

import { useState } from 'react'

export function useProject() {
  const [projects, setProjects] = useState<Project[]>([])

  const useCase = getProjectUseCases()

  return {
    projects,
    setProjects,
    findAll: useCase.findAllActive.bind(useCase),
  }
}
