import { z } from 'zod'

export const projectFormValidationSchema = z.object({
  author: z.string().min(1, 'Autor não pode estar vazio'),
  title: z.string().min(1, 'Título não pode estar vazio'),
  notice: z.string().min(1, 'Edital é obrigatório'),
  description: z.string().min(1, 'Descrição não pode estar vazio'),
  objectives: z.string().min(1, 'Objetivos não pode estar vazio'),
  methodology: z.string().min(1, 'Metodologia não pode estar vazio'),
  justification: z.string().min(1, 'Justificativa não pode estar vazio'),
  hours: z
    .string()
    .min(1, 'Quantidade de horas não pode estar vazio')
    .regex(/^[0-9]+$/, 'Apenas números são permitidos'),
  topicsOfInterest: z.string(),
  complianceModel: z
    .string()
    .min(1, 'Modelo de aplicação não pode estar vazio'),
  schedule: z.string().min(1, 'Cronograma não pode estar vazio'),
  references: z.string().min(1, 'Referências não pode estar vazio'),
})

export type ProjectFormParams = z.infer<typeof projectFormValidationSchema>
