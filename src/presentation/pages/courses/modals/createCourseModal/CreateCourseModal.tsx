import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { errorsField } from '@/main/error/RequestError'

import { CreatedCourse } from '@/domain/course/entities/Course'
import { Fields } from '@/domain/course/entities/Enums'

import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'

import { CheckBoxOption, CheckBoxesContainer } from './Styles'
import {
  CourseFormParams,
  courseFormValidationSchema,
} from '@/domain/course/validation/CourseZodValidation'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  ModalForm,
} from '@/presentation/components'
import { User } from '@/domain/user/entities/User'

interface CreateCourseModalProps {
  show: boolean
  users: User[]
  possibleErrors?: errorsField<Fields>[]
  handleCreateCourse: (course: CreatedCourse) => Promise<void>
  onHide: () => void
}

export default function CreateCourseModal({
  possibleErrors,
  show,
  users,
  handleCreateCourse,
  onHide,
}: CreateCourseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CourseFormParams>({
    resolver: zodResolver(courseFormValidationSchema),
    defaultValues: {
      name: '',
      acronym: '',
      active: '',
      code: '',
      coordinator: '',
      schedule: [],
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

  async function createCourse(data: CourseFormParams) {
    const course: CreatedCourse = {
      name: data.name,
      active: data.active === 'Ativo',
      acronym: data.acronym,
      code: data.code,
      coordinator: data.coordinator,
      schedule: data.schedule,
    }
    await handleCreateCourse(course)
  }

  return (
    <MainModal
      title="Adicionar novo curso"
      show={show}
      onHide={onHide}
      size="lg"
    >
      <ModalForm onSubmit={handleSubmit((data) => createCourse(data))}>
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
            Criar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
