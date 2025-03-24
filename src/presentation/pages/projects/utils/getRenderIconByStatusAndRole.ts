/* eslint-disable no-unused-vars */
import { Roles } from '@/domain/role/entities/Role'

import { DefaultRenderOption } from './DefaultRenderOptions'
import { getStrategyIcon, Status } from './strategyIcon'

export enum IconOptions {
  SUBMIT = 'SUBMIT',
  COMMENTS = 'COMMENTS',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  EVALUATE = 'EVALUATE',
  REPORT = 'REPORT',
}

export interface RenderResponse {
  Icon: {
    SUBMIT: boolean
    COMMENTS: boolean
    EDIT: boolean
    DELETE: boolean
    EVALUATE: boolean
    REPORT: boolean
  }
}

export const getRenderIconByStatusAndRole = (
  status = '',
  userRole?: string,
): RenderResponse => {
  if (userRole === Roles.DIRECTOR || userRole === Roles.ADM_DIRECTOR) {
    if (Status.IsDraft(status)) return DefaultRenderOption.DRAFT_DIRECTOR
    return DefaultRenderOption.DIRECTOR
  }

  const availableIcons = Object.values(IconOptions)
  const response: RenderResponse = DefaultRenderOption.INITIAL

  availableIcons.forEach((option) => {
    const strategyIcon = getStrategyIcon(option)
    const shouldRender = strategyIcon.shouldRender(status)
    response.Icon[option] = shouldRender
  })

  return response
}
