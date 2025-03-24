import { z } from 'zod'

export const NoticeFormValidationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  topicsOfInterest: z.string().optional(),
  description: z
    .string()
    .min(20, 'Descrição deve conter no mínimo 20 caracteres'),
  semester: z.string().min(1, 'Semestre é obrigatório'),
  year: z
    .string()
    .min(1, 'Ano é obrigatório')
    .max(4, 'Ano deve contar no máximo 4 caracteres'),
  openDate: z
    .string()
    .min(1, 'Data de início de recebimento de projetos é obrigatória'),
  closeDate: z
    .string()
    .min(1, 'Data de fim de recebimento de projetos é obrigatória'),
  evaluationEndDate: z
    .string()
    .min(1, 'Data limite de avaliação é obrigatória'),
  course: z.string().min(1, 'Curso é obrigatório'),
})

export type FormParams = z.infer<typeof NoticeFormValidationSchema>

export const EditNoticeFormValidationSchema = NoticeFormValidationSchema.extend(
  { active: z.string().min(1, 'Situação é obrigatória') },
)

export type EditNoticeFormParams = z.infer<
  typeof EditNoticeFormValidationSchema
>
