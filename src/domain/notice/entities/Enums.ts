import { Notice } from './Notice'

export type NoticeFields = keyof Omit<Notice, 'id' | 'active'>
