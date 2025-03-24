import { zodReportValidationShema } from '@/domain/report/validation/ZodFormValidationSchema'
import { useState } from 'react'

interface ReportError {
  issues: Array<{
    message: string
    index: number
  }>
}

export function useReportValidation() {
  const [errors, setErrors] = useState<ReportError | null>(null)

  function validate(data: any) {
    const validation = zodReportValidationShema.safeParse(data)
    if (!validation.success) {
      setErrors({
        issues: validation.error.issues.map((issue) => {
          return {
            message: issue.message,
            index: issue.path[0] as number,
          }
        }),
      })
    }
  }

  function clearErrors() {
    setErrors(null)
  }

  return { errors, validate, clearErrors }
}
