import { CreatedNotice, Notice } from '../entities/Notice'

export interface INoticeUseCases {
  findAll(active: boolean): Promise<Notice[]>
  create(notice: CreatedNotice): Promise<Notice>
  updateById(notice: Notice): Promise<Notice>
  deleteById(id: string): Promise<void>
}
