import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  ProjectFormParams,
  projectFormValidationSchema,
} from '@/domain/project/validation/ProjectZodValidation'

import { createdProject } from '@/domain/project/entities/Project'
import { Notice } from '@/domain/notice/entities/Notice'

import {
  SuggestionItem,
  SuggestionList,
  TopicOfInterestCard,
  TopicsOfInterestContainer,
  UserListContainer,
} from './Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  ModalForm,
  RichText,
} from '@/presentation/components'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { User } from '@/domain/user/entities/User'

interface CreateProjectModalProps {
  notices: Notice[]
  handleCreateProject: (project: createdProject) => Promise<void>
  show: boolean
  onHide: () => void
  users: User[]
}

export default function CreateProjectModal({
  notices,
  show,
  onHide,
  handleCreateProject,
  users,
}: CreateProjectModalProps) {
  const [chosenNotice, setChosenNotice] = useState<Notice>()
  const [chosenTopics, setChosenTopics] = useState<string[]>([])

  const [getDescriptionEditor, setDescriptionEditor] = useState<ClassicEditor>()
  const [getScheduleEditor, setScheduleEditor] = useState<ClassicEditor>()
  const [getJustificationEditor, setJustificationEditor] =
    useState<ClassicEditor>()
  const [getMethodologyEditor, setMethodologyEditor] = useState<ClassicEditor>()
  const [getObjectivesEditor, setObjectivesEditor] = useState<ClassicEditor>()
  const [getReferencesEditor, setReferencesEditor] = useState<ClassicEditor>()
  const [authorInput, setAuthorInput] = useState<string>('')
  const [showUsersList, setShowUsersList] = useState(false)

  const user = GetAuthenticatedUser()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormParams>({
    resolver: zodResolver(projectFormValidationSchema),
    defaultValues: {
      author: user!.role.startsWith('DIRETOR') ? '' : user!.name,
      title: '',
      complianceModel: '',
      notice: '',
      description: '',
      schedule: '',
      hours: '',
      justification: '',
      methodology: '',
      objectives: '',
      topicsOfInterest: '',
      references: '',
    },
  })

  function createProject(data: ProjectFormParams): void {
    if (!isChosenUserAvailableAsAuthor(data.author)) {
      setError(
        'author',
        {
          type: 'custom',
          message: 'Autor não disponível',
        },
        { shouldFocus: true },
      )
      return
    }

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

    const author = users.find(
      (user) => user.name === data.author.toLocaleUpperCase(),
    )

    const project: createdProject = {
      author: {
        id: author!.id,
        name: author!.name,
      },
      title: data.title,
      complianceModel: data.complianceModel,
      proposedHours: data.hours,
      notice: {
        id: chosenNotice!.id,
        title: chosenNotice!.title,
      },
      topicsOfInterest: chosenTopics,
      description: data.description.replace(/&nbsp;/g, ''),
      objectives: data.objectives.replace(/&nbsp;/g, ''),
      methodology: data.methodology.replace(/&nbsp;/g, ''),
      justification: data.justification.replace(/&nbsp;/g, ''),
      schedule: data.schedule.replace(/&nbsp;/g, ''),
      references: data.references.replace(/&nbsp;/g, ''),
    }

    handleCreateProject(project)
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

  const isChosenUserAvailableAsAuthor = (userName: string): boolean =>
    users.some((user) => user.name === userName.toUpperCase())

  const filteredUsers = useMemo(() => {
    const lowerCaseSearch = authorInput.toLowerCase()
    return users
      .filter((user) => user.name.toLowerCase().includes(lowerCaseSearch))
      .sort((current, next) => current.name.localeCompare(next.name))
  }, [authorInput, users])

  const availableAuthorsForSuggestionList = () => {
    if (filteredUsers.length === 0) {
      setShowUsersList(false)
    } else {
      setShowUsersList(true)
    }
  }

  useEffect(() => {
    if (filteredUsers.length === 0) {
      setShowUsersList(false)
    }
  }, [filteredUsers])

  const closeSuggestionList = () =>
    setTimeout(() => setShowUsersList(false), 200)

  return (
    <MainModal
      title="Adicionar novo projeto"
      show={show}
      onHide={onHide}
      size="xl"
      closable="static"
    >
      <ModalForm onSubmit={handleSubmit((data) => createProject(data))}>
        <MainLabel htmlFor="author">Autor: *</MainLabel>
        {user?.role.startsWith('DIRETOR') ? (
          <>
            <UserListContainer>
              <MainInput
                id="author"
                type="text"
                list="authors"
                {...register('author')}
                onChange={(e) => {
                  setValue('author', e.target.value)
                  setAuthorInput(e.target.value)
                  availableAuthorsForSuggestionList()
                }}
                onClick={availableAuthorsForSuggestionList}
                autoComplete="off"
                onBlur={closeSuggestionList}
              />
              {showUsersList && (
                <SuggestionList>
                  {filteredUsers.map((user) => (
                    <SuggestionItem
                      key={user.id}
                      value={user.name}
                      onClick={() => {
                        setValue('author', user.name)
                        setShowUsersList(false)
                      }}
                    >
                      {user.name}
                    </SuggestionItem>
                  ))}
                </SuggestionList>
              )}
            </UserListContainer>
          </>
        ) : (
          <MainInput id="author" type="text" {...register('author')} disabled />
        )}
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
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
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
            <MainLabel htmlFor="topicOfInterest">
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
            Criar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
