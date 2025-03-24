import { z } from 'zod'

export const zodReportValidationShema = z
  .array(
    z.string().min(1, {
      message: 'Descrição da atividade não pode estar vazio',
    }),
  )
  .min(1, { message: 'Informe pelo menos uma atividade' })

export type ReportFormParams = z.infer<typeof zodReportValidationShema>
