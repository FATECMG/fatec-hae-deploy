import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Project } from '@/domain/project/entities/Project'
import {
  TopicOfInterestCard,
  TopicsOfInterestContainer,
} from '@/presentation/pages/projects/modals/createProjectModal/Styles'
import {
  ProjectFormParams,
  projectFormValidationSchema,
} from '@/domain/project/validation/ProjectZodValidation'
import { Notice } from '@/domain/notice/entities/Notice'
import { useEffect, useState } from 'react'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  ModalForm,
  RichText,
} from '@/presentation/components'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface EditProjectModalProps {
  project: Project
  notices: Notice[]
  handleEditProject: (project: Project) => Promise<void>
  show: boolean
  onHide: () => void
}

export default function EditProjectModal({
  project,
  notices,
  show,
  onHide,
  handleEditProject,
}: EditProjectModalProps) {
  const [chosenNotice, setChosenNotice] = useState<Notice>()
  const [chosenTopics, setChosenTopics] = useState<string[]>([])

  const [getDescriptionEditor, setDescriptionEditor] = useState<ClassicEditor>()
  const [getScheduleEditor, setScheduleEditor] = useState<ClassicEditor>()
  const [getJustificationEditor, setJustificationEditor] =
    useState<ClassicEditor>()
  const [getMethodologyEditor, setMethodologyEditor] = useState<ClassicEditor>()
  const [getObjectivesEditor, setObjectivesEditor] = useState<ClassicEditor>()
  const [getReferencesEditor, setReferencesEditor] = useState<ClassicEditor>()

  useEffect(() => {
    const filter = notices.find((notice) => notice.id === project.notice.id)
    setChosenNotice(filter)
    setChosenTopics(project.topicsOfInterest)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormParams>({
    resolver: zodResolver(projectFormValidationSchema),
    defaultValues: {
      author: project.author.name,
      title: project.title,
      notice: project.notice.id,
      complianceModel: project.complianceModel,
      description: project.description,
      schedule: project.schedule,
      hours: project.hours.proposed,
      topicsOfInterest: '',
      justification: project.justification,
      methodology: project.methodology,
      objectives: project.objectives,
      references: project.references,
    },
  })

  function editProject(data: ProjectFormParams): void {
    if (chosenTopics.length === 0) {
      setError(
        'topicsOfInterest',
        {
          type: 'custom',
          message: 'Selecione pelo menos um tópico de interesse',
        },
        { shouldFocus: true },
      )
      document.querySelector('.modal')?.scroll(0, 0)
      return
    }

    const newProject: Project = {
      id: project.id,
      author: project.author,
      comments: project.comments,
      title: data.title,
      complianceModel: data.complianceModel,
      sendDate: project.sendDate,
      hours: {
        approved: project.hours.approved,
        proposed: data.hours,
      },
      notice: {
        id: chosenNotice!.id,
        title: chosenNotice!.title,
      },
      topicsOfInterest: chosenTopics,
      status: project.status,
      active: project.active,
      description: data.description.replace(/&nbsp;/g, ''),
      objectives: data.objectives.replace(/&nbsp;/g, ''),
      methodology: data.methodology.replace(/&nbsp;/g, ''),
      justification: data.justification.replace(/&nbsp;/g, ''),
      schedule: data.schedule.replace(/&nbsp;/g, ''),
      references: data.references.replace(/&nbsp;/g, ''),
    }

    handleEditProject(newProject)
  }

  function handleUpdateChosenNotice(noticeId: string): void {
    const newNotice = notices.find((notice) => notice.id === noticeId)
    setChosenNotice(newNotice)
    setChosenTopics([])
  }

  function addTopic(topic: string): void {
    setChosenTopics([...chosenTopics, topic])
  }

  function removeTopic(topicToRemove: string): void {
    const newTopics = chosenTopics.filter((topic) => topic !== topicToRemove)
    setChosenTopics(newTopics)
  }

  const updateFieldValue = (
    field: keyof ProjectFormParams,
    value: string,
  ): void => setValue(field, value)

  return (
    <MainModal
      title="Editar projeto"
      size="xl"
      show={show}
      onHide={onHide}
      closable="static"
    >
      <ModalForm onSubmit={handleSubmit((data) => editProject(data))}>
        <MainLabel htmlFor="author">Autor:</MainLabel>
        <MainInput id="author" type="text" {...register('author')} disabled />
        {errors.author && (
          <ColoredErrorMessage>{errors.author.message}</ColoredErrorMessage>
        )}
        <MainLabel htmlFor="title">Título: *</MainLabel>
        <MainInput id="title" type="text" {...register('title')} />
        {errors.title && (
          <ColoredErrorMessage>{errors.title.message}</ColoredErrorMessage>
        )}
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="complianceModel">
              Modelo de aplicação: *
            </MainLabel>
            <MainSelect id="complianceModel" {...register('complianceModel')}>
              <option value="PRESENCIAL">Presencial</option>
              <option value="HÍBRIDO">Híbrido</option>
              <option value="REMOTO">Remoto</option>
            </MainSelect>
            {errors.complianceModel && (
              <ColoredErrorMessage>
                {errors.complianceModel.message}
              </ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="hours">
              Quantidade de horas solicitadas: *
            </MainLabel>
            <MainInput id="hours" type="text" {...register('hours')} />
            {errors.hours && (
              <ColoredErrorMessage>{errors.hours.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="notice">Edital de referência: *</MainLabel>
        <MainSelect
          id="notice"
          {...register('notice')}
          onChange={(e) => handleUpdateChosenNotice(e.target.value)}
        >
          {notices.map((notice) => (
            <option key={notice.id} value={notice.id}>
              {notice.title}
            </option>
          ))}
        </MainSelect>
        {errors.notice && (
          <ColoredErrorMessage>{errors.notice.message}</ColoredErrorMessage>
        )}
        {chosenNotice && (
          <>
            <MainLabel
              htmlFor="topicOfInterest"
              {...register('topicsOfInterest')}
            >
              Tópicos de interesse: *
            </MainLabel>
            <TopicsOfInterestContainer>
              {chosenNotice.topicsOfInterest.map((topic) => {
                return chosenTopics.includes(topic) ? (
                  <TopicOfInterestCard
                    key={topic}
                    chosen={true}
                    onClick={() => removeTopic(topic)}
                  >
                    <p>{topic}</p>
                  </TopicOfInterestCard>
                ) : (
                  <TopicOfInterestCard
                    key={topic}
                    onClick={() => addTopic(topic)}
                  >
                    <p>{topic}</p>
                  </TopicOfInterestCard>
                )
              })}
            </TopicsOfInterestContainer>
            {errors.topicsOfInterest && (
              <ColoredErrorMessage>
                {errors.topicsOfInterest.message}
              </ColoredErrorMessage>
            )}
          </>
        )}
        <MainLabel
          htmlFor="description"
          onClick={() => getDescriptionEditor?.focus()}
        >
          Descrição: *
        </MainLabel>
        <RichText
          field="description"
          fieldValue={project.description}
          setEditor={setDescriptionEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.description && (
          <ColoredErrorMessage>
            {errors.description.message}
          </ColoredErrorMessage>
        )}
        <MainLabel
          htmlFor="objectives"
          onClick={() => getObjectivesEditor?.focus()}
        >
          Objetivos: *
        </MainLabel>
        <RichText
          field="objectives"
          fieldValue={project.objectives}
          setEditor={setObjectivesEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.objectives && (
          <ColoredErrorMessage>{errors.objectives.message}</ColoredErrorMessage>
        )}
        <MainLabel
          htmlFor="methodology"
          onClick={() => getMethodologyEditor?.focus()}
        >
          Metodologia: *
        </MainLabel>
        <RichText
          field="methodology"
          fieldValue={project.methodology}
          setEditor={setMethodologyEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.methodology && (
          <ColoredErrorMessage>
            {errors.methodology.message}
          </ColoredErrorMessage>
        )}
        <MainLabel
          htmlFor="justification"
          onClick={() => getJustificationEditor?.focus()}
        >
          Justificativa: *
        </MainLabel>
        <RichText
          field="justification"
          fieldValue={project.justification}
          setEditor={setJustificationEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.justification && (
          <ColoredErrorMessage>
            {errors.justification.message}
          </ColoredErrorMessage>
        )}
        <MainLabel
          htmlFor="schedule"
          onClick={() => getScheduleEditor?.focus()}
        >
          Cronograma: *
        </MainLabel>
        <RichText
          field="schedule"
          fieldValue={project.schedule}
          setEditor={setScheduleEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.schedule && (
          <ColoredErrorMessage>{errors.schedule.message}</ColoredErrorMessage>
        )}
        <MainLabel
          htmlFor="references"
          onClick={() => getReferencesEditor?.focus()}
        >
          Referências: *
        </MainLabel>
        <RichText
          field="references"
          fieldValue={project.references}
          setEditor={setReferencesEditor}
          updateFieldValue={updateFieldValue}
        />
        {errors.references && (
          <ColoredErrorMessage>{errors.references.message}</ColoredErrorMessage>
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
  )
}
