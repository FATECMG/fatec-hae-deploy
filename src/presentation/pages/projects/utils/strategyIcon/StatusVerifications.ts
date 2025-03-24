import { projectStatus } from '@/domain/project/entities/Project'

export namespace Status {
  export function IsDraft(status: string): boolean {
    return status === projectStatus.DRAFT
  }

  export function IsNotDraft(status: string): boolean {
    return status !== projectStatus.DRAFT
  }

  export function IsUnderValidation(status: string): boolean {
    return status === projectStatus.UNDER_VALIDATION
  }

  export function IsNotUnderValidation(status: string): boolean {
    return status !== projectStatus.UNDER_VALIDATION
  }

  export function IsSent(status: string): boolean {
    return status === projectStatus.SENT
  }

  export function IsNotSent(status: string): boolean {
    return status !== projectStatus.SENT
  }

  export function IsRejected(status: string): boolean {
    return status === projectStatus.REJECTED
  }

  export function IsNotRejected(status: string): boolean {
    return status !== projectStatus.REJECTED
  }

  export function IsApproved(status: string): boolean {
    return status === projectStatus.APPROVED
  }

  export function IsNotApproved(status: string): boolean {
    return status !== projectStatus.APPROVED
  }

  export function IsReturnedForCorrection(status: string): boolean {
    return status === projectStatus.RETURNED_FOR_CORRECTION
  }

  export function IsNotReturnedForCorrection(status: string): boolean {
    return status !== projectStatus.RETURNED_FOR_CORRECTION
  }
}
