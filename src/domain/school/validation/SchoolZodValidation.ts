import { z } from 'zod'

export const schoolFormValidationSchema = z.object({
  name: z.string().min(1, { message: 'Nome da escola não pode estar vazio' }),
  active: z
    .string()
    .min(1, { message: 'Situação da escola não pode estar vazia' }),
  state: z.string().min(1, { message: 'Estado  não pode estar vazio' }),
  street: z.string().min(1, { message: 'Logradouro não pode estar vazio' }),
  postCode: z.string().min(1, { message: 'CEP não pode estar vazio' }),
  number: z
    .string()
    .min(1, { message: 'Número do endereço não pode estar vazio' }),
  complement: z.string().optional(),
  district: z.string().min(1, { message: 'Bairro não pode estar vazio' }),
  city: z.string().min(1, { message: 'Cidade não pode estar vazia' }),
})

export type SchoolFormParams = z.infer<typeof schoolFormValidationSchema>
