import { useState } from 'react'

import {
  AuthFormProps,
  AuthFormValidationSchema,
} from '@/domain/authentication/validation/AuthZodValidation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNavigate, Navigate } from 'react-router-dom'

import { getAuthenticationUseCases } from '@/main/factories/AuthenticationUseCaseFactory'

import { useDispatch, useSelector } from 'react-redux'
import { makeLogin } from '@/infra/reducers/user/UserActions'
import { rootReducerProps } from '@/config/redux/RootReducer'

import { getUserHomePage } from '@/presentation/utils/GetUserHomePage'

import {
  ButtonSeparator,
  ErrorMessage,
  FormContainer,
  FormTitle,
  IconContainer,
  InputContainer,
  InputSeparator,
  LoginButton,
  LoginForm,
  LoginInput,
  LoginLabel,
  PageContainer,
} from './Styles'

import { MainLoader } from '@/presentation/components'

import { Envelope, Eye, EyeSlash, LockSimple, SignIn } from 'phosphor-react'

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [seePwIcon, setSeePwIcon] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [tryingToLogin, setTryingToLogin] = useState<boolean>(false)

  const authenticationUseCases = getAuthenticationUseCases()

  const redirectUser = useNavigate()

  const dispatch = useDispatch()

  const { user } = useSelector(
    (rootReducer: rootReducerProps) => rootReducer.userReducer,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormProps>({
    resolver: zodResolver(AuthFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  if (user) {
    return <Navigate to={getUserHomePage(user.role)} replace={true} />
  }

  async function connectUser(data: AuthFormProps): Promise<void> {
    try {
      setTryingToLogin(true)
      const authenticationResponse = await authenticationUseCases.auth(
        data.email,
        data.password,
      )

      sessionStorage.setItem(
        'info-token',
        JSON.stringify(authenticationResponse.accessToken),
      )

      sessionStorage.setItem(
        'token',
        JSON.stringify(authenticationResponse.idToken),
      )

      const authenticatedUser =
        await authenticationUseCases.getAuthenticatedUserData(
          authenticationResponse.accessToken,
        )

      dispatch(makeLogin(authenticatedUser))
      setTryingToLogin(false)
      redirectUser(getUserHomePage(authenticatedUser.role), { replace: true })
    } catch (error: unknown) {
      setTryingToLogin(false)
      sessionStorage.removeItem('token')
      error instanceof Error && setError('password', { message: error.message })
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormTitle>Fatec</FormTitle>
        <LoginForm onSubmit={handleSubmit((data) => connectUser(data))}>
          <InputSeparator>
            <LoginLabel htmlFor="email">E-mail</LoginLabel>
            <InputContainer>
              <LoginInput
                id="email"
                type="text"
                placeholder="Digite seu e-mail"
                autoComplete="off"
                {...register('email')}
              />
              <IconContainer left="10">
                <Envelope size={20} color="#b8b8b8" weight="fill" />
              </IconContainer>
            </InputContainer>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputSeparator>
          <InputSeparator>
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <InputContainer>
              <LoginInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                {...register('password')}
                onFocus={() => setSeePwIcon(true)}
              />
              <IconContainer left="10">
                <LockSimple size={20} color="#b8b8b8" weight="fill" />
              </IconContainer>
              {seePwIcon && (
                <IconContainer
                  right="10"
                  pointer={true}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={16} color="#b8b8b8" weight="fill" />
                  ) : (
                    <EyeSlash size={16} color="#b8b8b8" weight="fill" />
                  )}
                </IconContainer>
              )}
            </InputContainer>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputSeparator>
          <ButtonSeparator>
            <LoginButton type="submit" disabled={tryingToLogin}>
              {tryingToLogin ? (
                <MainLoader
                  containerHeight="auto"
                  loaderSize="20px"
                  borderSize="3px"
                />
              ) : (
                <>
                  Entrar
                  <SignIn size={20} color="#FFFFFF" weight="bold" />
                </>
              )}
            </LoginButton>
          </ButtonSeparator>
        </LoginForm>
      </FormContainer>
    </PageContainer>
  )
}
