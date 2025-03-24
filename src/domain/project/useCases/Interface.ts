import { Project, createdProject } from '../entities/Project'

export interface IProjectUseCases {
  findAllActive(filters: string[]): Promise<Project[]>
  findAllDeactive(): Promise<Project[]>
  findAllByAuthor(id: string): Promise<Project[]>
  save(createdProject: createdProject): Promise<Project>
  updateById(project: Project): Promise<Project>
  deleteById(id: string): Promise<void>
  submitProject(id: string): Promise<Project>
  evaluateProject(id: string, status: string): Promise<Project>
}
