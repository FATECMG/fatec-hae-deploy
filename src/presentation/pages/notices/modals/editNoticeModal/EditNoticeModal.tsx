import {
  EditNoticeFormParams,
  EditNoticeFormValidationSchema,
} from '@/domain/notice/Validation/NoticeZodValidation'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  MainTextArea,
  ModalForm,
} from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Notice } from '@/domain/notice/entities/Notice'
import { useEffect, useState } from 'react'
import { normalizeDate } from '@/presentation/utils/Masks'
import { TopicOfInterestCard, TopicOfInterestContainer } from './Styles'
import {
  DeleteIcon,
  TopicsOfInterestCardContainer,
} from '../createNoticeModal/Styles'
import { NoticeFields } from '@/domain/notice/entities/Enums'
import { errorsField } from '@/main/error/RequestError'
import { Course } from '@/domain/course/entities/Course'

interface EditNoticeModalProps {
  courses: Course[]
  possibleErrors?: errorsField<NoticeFields>[]
  noticeToEdit: Notice
  editNotice: (notice: Notice) => Promise<void>
  show: boolean
  onHide: () => void
}

export default function EditNoticeModal({
  courses,
  possibleErrors,
  noticeToEdit,
  editNotice,
  show,
  onHide,
}: EditNoticeModalProps) {
  const [topicsOfInterestState, setTopicsOfInterestState] = useState<string[]>(
    noticeToEdit.topicsOfInterest,
  )
  const [topicsOfInterestInput, setTopicsOfInterestInput] = useState<string>('')

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

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<EditNoticeFormParams>({
    resolver: zodResolver(EditNoticeFormValidationSchema),
    defaultValues: {
      title: noticeToEdit.title,
      active: noticeToEdit.active ? 'true' : 'false',
      topicsOfInterest: '',
      description: noticeToEdit.description,
      semester: noticeToEdit.semester,
      year: noticeToEdit.year,
      openDate: noticeToEdit.openDate,
      closeDate: noticeToEdit.closeDate,
      evaluationEndDate: noticeToEdit.evaluationEndDate,
      course: noticeToEdit.course.id,
    },
  })

  const watchedOpenDate = watch('openDate')
  const watchedCloseDate = watch('closeDate')
  const watchedEvaluationEndDate = watch('evaluationEndDate')

  useEffect(() => {
    setValue('openDate', normalizeDate(watchedOpenDate))
  }, [setValue, watchedOpenDate])
  useEffect(() => {
    setValue('closeDate', normalizeDate(watchedCloseDate))
  }, [setValue, watchedCloseDate])
  useEffect(() => {
    setValue('evaluationEndDate', normalizeDate(watchedEvaluationEndDate))
  }, [setValue, watchedEvaluationEndDate])

  function handleEditNotice(data: EditNoticeFormParams): void {
    if (topicsOfInterestState.length === 0) {
      setError('topicsOfInterest', {
        type: 'custom',
        message: 'Tópicos de interesse não pode estar vazio',
      })
      return
    }

    const Notice: Notice = {
      id: noticeToEdit.id,
      title: data.title,
      active: data.active === 'true',
      topicsOfInterest: topicsOfInterestState,
      description: data.description,
      semester: data.semester,
      year: data.year,
      openDate: data.openDate,
      closeDate: data.closeDate,
      evaluationEndDate: data.evaluationEndDate,
      course: {
        id: data.course,
        name: courses.find((course) => course.id === data.course)!.name,
      },
    }
    editNotice(Notice)
  }

  function handleAddTopicOfInterest() {
    if (!topicsOfInterestInput) {
      setError('topicsOfInterest', {
        type: 'custom',
        message: 'Tópico de interesse não pode estar vazio',
      })
      return
    }
    if (
      topicsOfInterestState.find((topic) => topic === topicsOfInterestInput)
    ) {
      setError('topicsOfInterest', {
        type: 'custom',
        message: `Tópico de interesse '${topicsOfInterestInput.toUpperCase()}' já foi adicionado`,
      })
      return
    }
    setTopicsOfInterestState([...topicsOfInterestState, topicsOfInterestInput])
    setTopicsOfInterestInput('')
    clearErrors('topicsOfInterest')
  }

  function handleRemoveTopicOfInterest(indexToRemove: number) {
    const newTopics = topicsOfInterestState.filter(
      (topic, index) => index !== indexToRemove,
    )
    setTopicsOfInterestState(newTopics)
  }

  return (
    <>
      <MainModal
        title="Editar edital"
        show={show}
        onHide={onHide}
        closable="static"
        size="lg"
      >
        <ModalForm onSubmit={handleSubmit((data) => handleEditNotice(data))}>
          <MainLabel htmlFor="title">Título: *</MainLabel>
          <MainInput id="title" type="text" {...register('title')} />
          {errors.title && (
            <ColoredErrorMessage>{errors.title.message}</ColoredErrorMessage>
          )}
          <AlignedInputs>
            <InputDiv>
              <MainLabel htmlFor="course">Curso de referência: *</MainLabel>
              <MainSelect id="course" {...register('course')}>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </MainSelect>
              {errors.course && (
                <ColoredErrorMessage>
                  {errors.course.message}
                </ColoredErrorMessage>
              )}
            </InputDiv>
            <InputDiv>
              <MainLabel htmlFor="situation">Situação: *</MainLabel>
              <MainSelect {...register('active')}>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </MainSelect>
              {errors.active && (
                <ColoredErrorMessage>
                  {errors.active.message}
                </ColoredErrorMessage>
              )}
            </InputDiv>
          </AlignedInputs>
          <MainLabel htmlFor="topicOfInterest">Tópicos de interesse:</MainLabel>
          <TopicsOfInterestCardContainer>
            {topicsOfInterestState.map((topic, index) => (
              <TopicOfInterestCard key={index}>
                <p>{topic}</p>
                <DeleteIcon
                  size={14}
                  weight="bold"
                  onClick={() => handleRemoveTopicOfInterest(index)}
                />
              </TopicOfInterestCard>
            ))}
          </TopicsOfInterestCardContainer>
          <TopicOfInterestContainer>
            <MainInput
              id="topicOfInterest"
              type="text"
              {...register('topicsOfInterest')}
              onChange={(e) => setTopicsOfInterestInput(e.target.value)}
              value={topicsOfInterestInput}
            />
            <MainButton
              type="button"
              color="blue-400"
              hoverColor="blue-350"
              onClick={handleAddTopicOfInterest}
            >
              Adicionar
            </MainButton>
          </TopicOfInterestContainer>
          {errors.topicsOfInterest && (
            <ColoredErrorMessage>
              {errors.topicsOfInterest.message}
            </ColoredErrorMessage>
          )}
          <MainLabel htmlFor="description">Descrição: *</MainLabel>
          <MainTextArea
            id="description"
            rows={10}
            {...register('description')}
          />
          {errors.description && (
            <ColoredErrorMessage>
              {errors.description.message}
            </ColoredErrorMessage>
          )}
          <AlignedInputs>
            <InputDiv>
              <MainLabel htmlFor="semester">Semestre: *</MainLabel>
              <MainSelect id="semester" {...register('semester')}>
                <option value="PRIMEIRO">1º semestre</option>
                <option value="SEGUNDO">2º semestre</option>
              </MainSelect>
              {errors.semester && (
                <ColoredErrorMessage>
                  {errors.semester.message}
                </ColoredErrorMessage>
              )}
            </InputDiv>
            <InputDiv>
              <MainLabel htmlFor="year">Ano: *</MainLabel>
              <MainInput id="year" type="text" {...register('year')} />
              {errors.year && (
                <ColoredErrorMessage>{errors.year.message}</ColoredErrorMessage>
              )}
            </InputDiv>
          </AlignedInputs>
          <MainLabel htmlFor="openDate">
            Data de início de recebimento de projetos: *
          </MainLabel>
          <MainInput id="openDate" type="text" {...register('openDate')} />
          {errors.openDate && (
            <ColoredErrorMessage>{errors.openDate.message}</ColoredErrorMessage>
          )}
          <MainLabel htmlFor="closeDate">
            Data de fim de recebimento de projetos: *
          </MainLabel>
          <MainInput id="closeDate" type="text" {...register('closeDate')} />
          {errors.closeDate && (
            <ColoredErrorMessage>
              {errors.closeDate.message}
            </ColoredErrorMessage>
          )}
          <MainLabel htmlFor="evaluationEndDate">
            Data limite de avaliação: *
          </MainLabel>
          <MainInput
            id="evaluationEndDate"
            type="text"
            {...register('evaluationEndDate')}
          />
          {errors.evaluationEndDate && (
            <ColoredErrorMessage>
              {errors.evaluationEndDate.message}
            </ColoredErrorMessage>
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
        </ModalForm>
      </MainModal>
    </>
  )
}
