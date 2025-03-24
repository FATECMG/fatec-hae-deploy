/* eslint-disable no-unused-vars */
import { Comment } from '@/domain/comment/entities/Comment'

export enum projectStatus {
  DRAFT = 'RASCUNHO',
  APPROVED = 'APROVADO',
  REJECTED = 'REJEITADO',
  SENT = 'ENVIADO',
  AWAITING_CORRECTION = 'AGUARDANDO CORREÇÃO',
  UNDER_VALIDATION = 'EM VALIDAÇÃO',
  RETURNED_FOR_CORRECTION = 'DEVOLVIDO PARA AJUSTES',
}

interface Hours {
  approved: string
  proposed: string
}

export interface Author {
  id: string
  name: string
}

interface Notice {
  id: string
  title: string
}

export interface Project {
  id: string
  author: Author
  title: string
  notice: Notice
  description: string
  objectives: string
  methodology: string
  justification: string
  schedule: string
  hours: Hours
  topicsOfInterest: string[]
  complianceModel: string
  status: string
  active: boolean
  references: string
  comments: Comment[]
  sendDate: string | undefined
}

export interface createdProject {
  author: Author
  title: string
  notice: Notice
  description: string
  objectives: string
  methodology: string
  justification: string
  schedule: string
  proposedHours: string
  topicsOfInterest: string[]
  complianceModel: string
  references: string
}
