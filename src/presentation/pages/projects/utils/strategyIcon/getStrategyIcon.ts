import { IconOptions } from '@/presentation/pages/projects/utils/getRenderIconByStatusAndRole'

import {
  CommentsIcon,
  DeleteIcon,
  EditIcon,
  EvaluateIcon,
  Icon,
  SubmitIcon,
  ReportIcon,
} from './Strategy'

export const getStrategyIcon = (option: IconOptions): Icon => {
  if (option === IconOptions.SUBMIT) {
    return new SubmitIcon()
  }

  if (option === IconOptions.COMMENTS) {
    return new CommentsIcon()
  }

  if (option === IconOptions.EDIT) {
    return new EditIcon()
  }

  if (option === IconOptions.DELETE) {
    return new DeleteIcon()
  }

  if (option === IconOptions.EVALUATE) {
    return new EvaluateIcon()
  }

  if (option === IconOptions.REPORT) {
    return new ReportIcon()
  }

  throw new Error('Invalid option')
}
