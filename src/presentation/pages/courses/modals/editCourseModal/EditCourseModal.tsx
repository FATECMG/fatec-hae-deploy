import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Course } from '@/domain/course/entities/Course'
import { Fields } from '@/domain/course/entities/Enums'

import { errorsField } from '@/main/error/RequestError'
import {
  CourseFormParams,
  courseFormValidationSchema,
} from '@/domain/course/validation/CourseZodValidation'

import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  CheckBoxesContainer,
  CheckBoxOption,
} from '@/presentation/pages/courses/modals/createCourseModal/Styles'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  ModalForm,
} from '@/presentation/components'
import { User } from '@/domain/user/entities/User'

interface EditCourseModalProps {
  course: Course
  users: User[]
  possibleErrors?: errorsField<Fields>[]
  show: boolean
  onHide: () => void
  handleEditCourse: (course: Course) => Promise<void>
}

export default function EditCourseModal({
  course,
  show,
  users,
  possibleErrors,
  onHide,
  handleEditCourse,
}: EditCourseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CourseFormParams>({
    resolver: zodResolver(courseFormValidationSchema),
    defaultValues: {
      name: course.name,
      acronym: course.acronym,
      active: course.active ? 'Ativo' : 'Inativo',
      code: course.code,
      coordinator: course.coordinator,
      schedule: course.schedule,
    },
  })

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

  function editCourse(data: CourseFormParams) {
    const updatedCourse: Course = {
      id: course.id,
      name: data.name,
      acronym: data.acronym,
      active: data.active === 'Ativo',
      code: data.code,
      coordinator: data.coordinator,
      schedule: data.schedule,
    }
    handleEditCourse(updatedCourse)
  }

  return (
    <MainModal title="Editar curso" show={show} onHide={onHide} size="lg">
      <ModalForm onSubmit={handleSubmit((data) => editCourse(data))}>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="nomeCurso">Nome do curso: *</MainLabel>
            <MainInput id="nomeCurso" {...register('name')} type="text" />
            {errors.name && (
              <ColoredErrorMessage>{errors.name.message}</ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="situacaoCurso">Situação: *</MainLabel>
            <MainSelect id="situacaoCurso" {...register('active')}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </MainSelect>
            {errors.active && (
              <ColoredErrorMessage>{errors.active.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="acronimo">Acrônimo: *</MainLabel>
            <MainInput id="acronimo" {...register('acronym')} type="text" />
            {errors.acronym && (
              <ColoredErrorMessage>
                {errors.acronym.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="codigoCurso">Código: *</MainLabel>
            <MainInput id="codigoCurso" {...register('code')} type="text" />
            {errors.code && (
              <ColoredErrorMessage>{errors.code.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="cursoHorario">Horário: *</MainLabel>
        <CheckBoxesContainer>
          <CheckBoxOption>
            <input
              type="checkbox"
              value="Matutino"
              id="manha"
              {...register('schedule')}
            />
            <label htmlFor="manha">Matutino</label>
          </CheckBoxOption>
          <CheckBoxOption>
            <input
              type="checkbox"
              value="Vespertino"
              id="tarde"
              {...register('schedule')}
            />
            <label htmlFor="tarde">Vespertino</label>
          </CheckBoxOption>
          <CheckBoxOption>
            <input
              type="checkbox"
              value="Noturno"
              id="noite"
              {...register('schedule')}
            />
            <label htmlFor="noite">Noturno</label>
          </CheckBoxOption>
        </CheckBoxesContainer>
        {errors.schedule && (
          <ColoredErrorMessage>{errors.schedule.message}</ColoredErrorMessage>
        )}
        <InputDiv>
          <MainLabel htmlFor="coordenador">Coordenador: *</MainLabel>
          <MainSelect id="coordenador" {...register('coordinator')}>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </MainSelect>
          {errors.coordinator && (
            <ColoredErrorMessage>
              {errors.coordinator.message}
            </ColoredErrorMessage>
          )}
        </InputDiv>
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
      </ModalForm>
    </MainModal>
  )
}
