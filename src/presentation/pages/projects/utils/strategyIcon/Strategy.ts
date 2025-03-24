import { Status } from './StatusVerifications'

export interface Icon {
  shouldRender: (status: string) => boolean
}

export class SubmitIcon implements Icon {
  shouldRender(status: string): boolean {
    return Status.IsDraft(status) || Status.IsReturnedForCorrection(status)
  }
}

export class CommentsIcon implements Icon {
  shouldRender(status: string): boolean {
    return Status.IsNotDraft(status) && Status.IsNotSent(status)
  }
}

export class EditIcon implements Icon {
  shouldRender(status: string): boolean {
    return (
      Status.IsNotUnderValidation(status) &&
      Status.IsNotSent(status) &&
      (Status.IsDraft(status) || Status.IsReturnedForCorrection(status))
    )
  }
}

export class DeleteIcon implements Icon {
  shouldRender(status: string): boolean {
    return (
      Status.IsNotUnderValidation(status) &&
      Status.IsNotSent(status) &&
      (Status.IsDraft(status) || Status.IsRejected(status))
    )
  }
}

export class EvaluateIcon implements Icon {
  shouldRender(status: string): boolean {
    return Status.IsUnderValidation(status)
  }
}

export class ReportIcon implements Icon {
  shouldRender(status: string): boolean {
    return Status.IsApproved(status)
  }
}
