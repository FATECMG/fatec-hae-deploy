import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { createdProject, Project } from '@/domain/project/entities/Project'

import { IProjectUseCases } from './Interface'

import { errorsField, RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

import { BASE_API } from '@/config/api/Api'

const RESOURCE = `${BASE_API}/projects`

export class ProjecUseCase implements IProjectUseCases {
  constructor(private httpclient: IHttpClient) {}

  async findAllActive(filters: string[]): Promise<Project[]> {
    const baseUrl = `${RESOURCE}?active=true${this.validateFilters(filters)}`

    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { body, statusCode } = await this.httpclient.request<Project[]>({
      method: 'get',
      resource: baseUrl,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.PROJECT.notFoundAll,
    })
  }

  async findAllDeactive(): Promise<Project[]> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { body, statusCode } = await this.httpclient.request<Project[]>({
      method: 'get',
      resource: `${RESOURCE}?active=false`,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.PROJECT.notFoundAll,
    })
  }

  async findAllByAuthor(id: string): Promise<Project[]> {
    const { body, statusCode } = await this.httpclient.request<Project[]>({
      method: 'get',
      resource: `${BASE_API}/users/${id}/projects`,
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.PROJECT.notFoundAll,
    })
  }

  async save(createdProject: createdProject): Promise<Project> {
    const { body, statusCode } = await this.httpclient.request<Project>({
      method: 'post',
      resource: RESOURCE,
      body: createdProject,
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
      ),
    })
  }

  async updateById(project: Project): Promise<Project> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { body, statusCode } = await this.httpclient.request<Project>({
      method: 'put',
      resource: `${RESOURCE}/${project.id}`,
      body: project,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
      ),
    })
  }

  async deleteById(id: string): Promise<void> {
    const { statusCode } = await this.httpclient.request<void>({
      method: 'delete',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      data: undefined,
      statusCode,
      notFoundMessage: DefaultErrorMessages.PROJECT.delete,
    })
  }

  async submitProject(id: string): Promise<Project> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { statusCode, body } = await this.httpclient.request<
      Project | errorsField
    >({
      method: 'patch',
      resource: `${RESOURCE}/${id}/status`,
      body: { status: 'ENVIADO' },
      header: { infotoken },
    })

    return properlyResponse({
      data: body as Project,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.PROJECT.submit,
        'warning',
        [body as errorsField],
      ),
    })
  }

  async evaluateProject(id: string, status: string): Promise<Project> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { statusCode, body } = await this.httpclient.request<Project>({
      method: 'patch',
      resource: `${RESOURCE}/${id}/status`,
      body: { status },
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.PROJECT.evaluation,
        'warning',
      ),
    })
  }

  private validateFilters(filters: string[]): string {
    const availableFilters = [
      'ENVIADO',
      'APROVADO',
      'REJEITADO',
      'AGUARDANDO CORREÇÃO',
      'EM VALIDAÇÃO',
    ]

    let urlParams = ''

    filters.forEach((item) =>
      availableFilters.includes(item)
        ? (urlParams += `&status=${item}`)
        : undefined,
    )

    return urlParams
  }
}
