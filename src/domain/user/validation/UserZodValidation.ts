import { z } from 'zod'
import { nameRegex } from '@/presentation/utils/Masks'

const userBaseValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome não pode estar vazio' })
    .regex(nameRegex, 'Nome não pode conter caracteres especiais'),
  academicTitle: z
    .string()
    .min(1, { message: 'Titulação não pode estar vazia' }),
  roles: z.string().min(1, { message: 'Cargo não pode estar vazio' }),
  courses: z.array(z.string()),
  registerNumber: z
    .string()
    .min(4, {
      message: 'Número de registro deve conter mais de 4 caracteres',
    })
    .max(20, {
      message: 'Número de registro não pode conter mais de 20 caracteres',
    }),
  email: z.string().email({ message: 'E-mail inválido' }),
  phone: z.string().min(1, { message: 'Telefone não pode estar vazio' }),
})

export const createUserValidationSchema = userBaseValidationSchema
  .extend({
    password: z
      .string()
      .min(10, { message: 'Senha deve conter mais de 10 caracteres' }),
    confirmPassword: z.string().min(1, {
      message: 'Confirmar senha não pode estar vazio',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type createUserFormParams = z.infer<typeof createUserValidationSchema>

export const editUserValidationSchema = userBaseValidationSchema.extend({
  active: z.string().min(1, { message: 'Situação é obrigatória' }),
})

export type editUserFormParams = z.infer<typeof editUserValidationSchema>
