import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  ButtonsDiv,
  ColoredErrorMessage,
  UserFormContainer,
  AlignedInputs,
  InputDiv,
} from './Styles'

import { normalizePhoneNumber } from '@/presentation/utils/Masks'
import { MainButton } from '@/presentation/components/buttons/Styles'

import {
  UserCourses,
  createdUser,
  possibleAcademicTitles,
} from '@/domain/user/entities/User'
import { UserErrorsFields } from '@/domain/user/entities/UserErrors'
import { Role, Roles } from '@/domain/role/entities/Role'

import { errorsField } from '@/main/error/RequestError'
import {
  createUserFormParams,
  createUserValidationSchema,
} from '@/domain/user/validation/UserZodValidation'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
} from '@/presentation/components'
import { Course } from '@/domain/course/entities/Course'
import {
  TopicOfInterestCard,
  TopicsOfInterestContainer,
} from '@/presentation/pages/projects/modals/createProjectModal/Styles'

interface CreateUserModalProps {
  courses: Course[]
  possibleErrors: errorsField<UserErrorsFields>[] | undefined
  roleOptions: Role[]
  handleCreateUser: (user: createdUser) => void
  onHide: () => void
  show: boolean
}

export default function CreateUserModal({
  courses,
  roleOptions,
  onHide,
  show,
  handleCreateUser,
  possibleErrors,
}: CreateUserModalProps) {
  const [chosenCourses, setChosenCourses] = useState<UserCourses[]>([])
  const [userRole, setUserRole] = useState<string>()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = useForm<createUserFormParams>({
    resolver: zodResolver(createUserValidationSchema),
    defaultValues: {
      name: '',
      academicTitle: '',
      registerNumber: '',
      email: '',
      phone: '',
      roles: '',
      password: '',
      confirmPassword: '',
      courses: [],
    },
  })

  const watchedPhone = watch('phone')
  useEffect(() => {
    setValue('phone', normalizePhoneNumber(watchedPhone))
  }, [watchedPhone, setValue])

  const renderErrors = (): void => {
    if (possibleErrors && possibleErrors?.length > 0) {
      possibleErrors.map((error) =>
        setError(error.field, { type: 'custom', message: error.message }),
      )
    }
  }

  useEffect(() => {
    renderErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [possibleErrors])

  function CreateUser(data: createUserFormParams) {
    if (data.roles === 'PROFESSOR' && chosenCourses.length <= 0) {
      setError('courses', {
        type: 'custom',
        message: 'Professor deve ser vinculado a pelo menos um curso',
      })
      return
    }

    const user: createdUser = {
      name: data.name,
      academicTitle: data.academicTitle as possibleAcademicTitles,
      password: data.password,
      registerNumber: data.registerNumber,
      courses: chosenCourses.length > 0 ? chosenCourses : [],
      phone: data.phone,
      email: data.email,
      roles: data.roles as Roles,
    }

    handleCreateUser(user)
  }

  function addCourse(course: UserCourses): void {
    setChosenCourses([...chosenCourses, course])
  }

  function removeCourse(id: string): void {
    const newCourses = chosenCourses.filter((course) => course.id !== id)
    setChosenCourses(newCourses)
  }

  function isCourseSelected(course: Course): boolean {
    return !!chosenCourses.find(
      (chosenCourses) => chosenCourses.id === course.id,
    )
  }

  function updateUserRole(role: string): void {
    setUserRole(role)
    setChosenCourses([])
  }

  return (
    <MainModal
      show={show}
      title="Adicionar novo usuário"
      onHide={onHide}
      size="lg"
    >
      <UserFormContainer onSubmit={handleSubmit((data) => CreateUser(data))}>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="nomeUsuario">Nome completo: *</MainLabel>
            <MainInput id="nomeUsuario" type="text" {...register('name')} />
            {errors.name && (
              <ColoredErrorMessage>{errors.name.message}</ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="registerNumber">
              Número de registro: *
            </MainLabel>
            <MainInput
              id="registerNumber"
              type="text"
              {...register('registerNumber')}
            />
            {errors.registerNumber && (
              <ColoredErrorMessage>
                {errors.registerNumber.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs breakpoint="995px">
          <InputDiv>
            <MainLabel htmlFor="academicTitle">Titulação: *</MainLabel>
            <MainSelect id="academicTitle" {...register('academicTitle')}>
              <option value="GRADUADO">Graduado</option>
              <option value="PÓS-GRADUADO">Pós-graduado</option>
              <option value="MESTRADO">Mestre</option>
              <option value="DOUTORADO">Doutor</option>
              <option value="NENHUMA">Nenhuma opção</option>
            </MainSelect>
            {errors.academicTitle && (
              <ColoredErrorMessage>
                {errors.academicTitle.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="role">Cargo: *</MainLabel>
            <MainSelect
              id="role"
              {...register('roles')}
              onChange={(e) => updateUserRole(e.target.value)}
            >
              {roleOptions.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </MainSelect>
            {errors.roles && (
              <ColoredErrorMessage>{errors.roles.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        {(userRole === 'PROFESSOR' || userRole === 'COORDENADOR') && (
          <>
            <MainLabel>Cursos ministrados:</MainLabel>
            <TopicsOfInterestContainer>
              {courses.map((course) => {
                return isCourseSelected(course) ? (
                  <TopicOfInterestCard
                    key={course.id}
                    chosen={true}
                    title="Clique novamente para remover o curso em que o professor leciona"
                    onClick={() => removeCourse(course.id)}
                  >
                    <p>{course.name}</p>
                  </TopicOfInterestCard>
                ) : (
                  <TopicOfInterestCard
                    key={course.id}
                    title="Clique para adicionar o curso em que o professor leciona"
                    onClick={() =>
                      addCourse({ id: course.id, name: course.name })
                    }
                  >
                    <p>{course.name}</p>
                  </TopicOfInterestCard>
                )
              })}
            </TopicsOfInterestContainer>
          </>
        )}
        {errors.courses && (
          <ColoredErrorMessage>{errors.courses.message}</ColoredErrorMessage>
        )}
        <MainLabel htmlFor="phone">Telefone: *</MainLabel>
        <MainInput
          id="phone"
          type="text"
          {...register('phone')}
          placeholder="Ex: 00000000000"
        />
        {errors.phone && (
          <ColoredErrorMessage>{errors.phone.message}</ColoredErrorMessage>
        )}
        <MainLabel htmlFor="email">E-mail: *</MainLabel>
        <MainInput id="email" type="text" {...register('email')} />
        {errors.email && (
          <ColoredErrorMessage>{errors.email.message}</ColoredErrorMessage>
        )}
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="password">Senha: *</MainLabel>
            <MainInput
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <ColoredErrorMessage>
                {errors.password.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="confirmPassword">Confirmar senha: *</MainLabel>
            <MainInput
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <ColoredErrorMessage>
                {errors.confirmPassword.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <p>Campos com * devem ser obrigatoriamente preenchidos</p>
        <ButtonsDiv>
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
          <MainButton type="submit" color="blue-400" hoverColor="blue-350">
            Criar
          </MainButton>
        </ButtonsDiv>
      </UserFormContainer>
    </MainModal>
  )
}
