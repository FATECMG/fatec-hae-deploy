import { CreateReport, type Report } from '@/domain/report/entities/Report'

export interface IReportUseCases {
  findAll(active: boolean): Promise<Report[]>
  save(report: CreateReport): Promise<Report>
}
