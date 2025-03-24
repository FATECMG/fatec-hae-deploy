import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  ButtonsDiv,
  ColoredErrorMessage,
  UserFormContainer,
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { normalizePhoneNumber } from '@/presentation/utils/Masks'
import { MainButton } from '@/presentation/components/buttons/Styles'

import {
  User,
  UserCourses,
  possibleAcademicTitles,
} from '@/domain/user/entities/User'
import { Role, Roles } from '@/domain/role/entities/Role'
import { Course } from '@/domain/course/entities/Course'

import { errorsField } from '@/main/error/RequestError'
import { UserErrorsFields } from '@/domain/user/entities/UserErrors'
import {
  editUserFormParams,
  editUserValidationSchema,
} from '@/domain/user/validation/UserZodValidation'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
} from '@/presentation/components'
import {
  TopicOfInterestCard,
  TopicsOfInterestContainer,
} from '@/presentation/pages/projects/modals/createProjectModal/Styles'

interface EditUserModalProps {
  courses: Course[]
  user: User
  possibleErrors: errorsField<UserErrorsFields>[] | undefined
  roleOptions: Role[]
  handleUpdateUser: (user: User) => void
  onHide: () => void
  show: boolean
}

export default function EditUserModal({
  courses,
  user,
  onHide,
  show,
  handleUpdateUser,
  possibleErrors,
  roleOptions,
}: EditUserModalProps) {
  const [chosenCourses, setChosenCourses] = useState<UserCourses[]>(
    user.courses,
  )
  const [userRole, setUserRole] = useState<string>(user.roles)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = useForm<editUserFormParams>({
    resolver: zodResolver(editUserValidationSchema),
    defaultValues: {
      name: user.name,
      active: user.active ? 'Ativo' : 'Inativo',
      academicTitle: user.academicTitle,
      registerNumber: user.registerNumber,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
      courses: [],
    },
  })

  const watchedPhone = watch('phone')

  useEffect(() => {
    setValue('phone', normalizePhoneNumber(watchedPhone))
  }, [setValue, watchedPhone])

  const renderErrors = (): void => {
    if (possibleErrors && possibleErrors?.length > 0) {
      possibleErrors.map((error) =>
        setError(error.field, { type: 'custom', message: error.message }),
      )
    }
  }

  useEffect(() => {
    renderErrors()
  }, [possibleErrors])

  function EditUser(data: editUserFormParams) {
    if (data.roles === 'PROFESSOR' && chosenCourses.length <= 0) {
      setError('courses', {
        type: 'custom',
        message: 'Professor deve ser vinculado a pelo menos um curso',
      })
      return
    }

    const updatedUser: User = {
      id: user.id,
      name: data.name,
      active: data.active === 'Ativo',
      academicTitle: data.academicTitle as possibleAcademicTitles,
      registerNumber: data.registerNumber,
      phone: data.phone,
      email: data.email,
      roles: data.roles as Roles,
      courses: chosenCourses,
    }
    handleUpdateUser(updatedUser)
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
    handleRoleAndCourseChange(role)
  }

  function handleRoleAndCourseChange(role: string): void {
    const shouldHaveCourses = (role: string): boolean =>
      role === 'PROFESSOR' || role === 'COORDENADOR'

    if (shouldHaveCourses(role)) {
      setChosenCourses(chosenCourses)
    } else {
      setChosenCourses([])
    }
  }

  return (
    <MainModal title="Editar usuário" show={show} onHide={onHide} size="lg">
      <UserFormContainer onSubmit={handleSubmit((data) => EditUser(data))}>
        <MainLabel htmlFor="nomeUsuario">Nome completo: *</MainLabel>
        <MainInput id="nomeUsuario" type="text" {...register('name')} />
        {errors.name && (
          <ColoredErrorMessage>{errors.name.message}</ColoredErrorMessage>
        )}
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="situation">Situação: *</MainLabel>
            <MainSelect id="situation" {...register('active')}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </MainSelect>
            {errors.active && (
              <ColoredErrorMessage>{errors.active.message}</ColoredErrorMessage>
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
            Atualizar
          </MainButton>
        </ButtonsDiv>
      </UserFormContainer>
    </MainModal>
  )
}
