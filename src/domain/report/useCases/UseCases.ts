import { CreateReport, Report } from '@/domain/report/entities/Report'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { DefaultErrorMessages } from '@/main/error/ErrorMessages'
import { RequestError } from '@/main/error/RequestError'

import { BASE_API } from '@/config/api/Api'

import { IReportUseCases } from './Interface'

const RESOURCE = `${BASE_API}/reports`

const FILES_RESOURCE = `${BASE_API}/reports/attachment`
export class ReportUseCases implements IReportUseCases {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly httpClienteWithoutTokens: IHttpClient,
  ) {}

  async findAll(active: boolean): Promise<Report[]> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const url = `${RESOURCE}?active=${active}`
    const { statusCode, body } = await this.httpClient.request<Report[]>({
      method: 'get',
      resource: url,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.REPORT.notFoundAll,
    })
  }

  async findAllByAuthor(): Promise<Report[]> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const url = `${RESOURCE}/author`

    const { statusCode, body } = await this.httpClient.request<Report[]>({
      method: 'get',
      resource: url,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      notFoundMessage: DefaultErrorMessages.REPORT.notFoundAll,
    })
  }

  async save(report: CreateReport): Promise<Report> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const urls = await this.getPreAssignedUrls(report)

    this.uploadAllFiles(report.files, urls)

    const { statusCode, body } = await this.httpClient.request<Report>({
      method: 'post',
      resource: `${RESOURCE}/`,
      body: report,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async update(report: CreateReport): Promise<Report> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { statusCode, body } = await this.httpClient.request<Report>({
      method: 'put',
      resource: `${RESOURCE}/`,
      body: report,
      header: { infotoken },
    })

    const urls = await this.getPreAssignedUrls(report)

    this.uploadAllFiles(report.files, urls)

    return properlyResponse({
      data: body,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  private async getPreAssignedUrls(
    createReport: CreateReport,
  ): Promise<string[]> {
    const { statusCode, body } = await this.httpClienteWithoutTokens.request<
      string[]
    >({
      method: 'post',
      resource: FILES_RESOURCE,
      body: {
        files: createReport.files.map((file) => ({
          name: file.name,
          type: file.name.split('.').pop() ?? 'webp',
        })),
        resourceId: createReport.projectId,
        resourceType: 'reports',
      },
    })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }

  private uploadAllFiles(Files: File[], preAssignedUrls: any[]) {
    Files.forEach((file) => {
      const urlObject = preAssignedUrls.find((each) =>
        each.url.includes(file.name.split('.').pop() ?? 'webp'),
      )

      this.uploadSingleFile(file, urlObject.url ?? '')
    })
  }

  private async uploadSingleFile(
    file: File,
    preAssignedUrl: string,
  ): Promise<void> {
    const { body, statusCode } =
      await this.httpClienteWithoutTokens.request<void>({
        method: 'put',
        body: file,
        resource: preAssignedUrl,
        header: { 'Content-Type': 'image/*' },
      })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }

  async submitReport(reportId: string): Promise<void> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { statusCode, body } = await this.httpClient.request<void>({
      method: 'patch',
      resource: `${RESOURCE}/${reportId}/status`,
      body: { status: 'ENVIADO' },
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }

  async deleteReport(reportId: string): Promise<void> {
    const infotoken = JSON.parse(sessionStorage.getItem('info-token') || 'null')

    const { statusCode, body } = await this.httpClient.request<void>({
      method: 'delete',
      resource: `${RESOURCE}/${reportId}`,
      header: { infotoken },
    })

    return properlyResponse({
      data: body,
      statusCode,
    })
  }
}
