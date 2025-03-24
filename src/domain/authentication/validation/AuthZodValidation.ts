import { z } from 'zod'

export const AuthFormValidationSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type AuthFormProps = z.infer<typeof AuthFormValidationSchema>
