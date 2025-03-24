import { nameRegex } from '@/presentation/utils/Masks'
import { z } from 'zod'

export const courseFormValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome do curso não pode estar vazio' })
    .regex(nameRegex, 'Nome do curso não pode conter caracteres especiais'),
  active: z
    .string()
    .min(1, { message: 'Situação do curso não pode estar vazia' }),
  coordinator: z
    .string()
    .min(1, { message: 'Coordenador  não pode estar vazio' }),
  schedule: z
    .array(
      z.string().min(1, { message: 'Horário do curso não pode estar vazio' }),
    )
    .min(1, { message: 'É necessário no mínimo 1 período' }),
  code: z.string().min(1, { message: 'Código do curso não pode estar vazio' }),
  acronym: z
    .string()
    .min(1, { message: 'Acrônimo do curso não pode estar vazia' }),
})

export type CourseFormParams = z.infer<typeof courseFormValidationSchema>
