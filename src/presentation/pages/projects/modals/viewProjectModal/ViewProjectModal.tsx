import { Project } from '@/domain/project/entities/Project'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import {
  MainInput,
  MainLabel,
  MainModal,
  ModalForm,
  ViewDataEditor,
} from '@/presentation/components'

interface ViewProjectModalProps {
  project: Project
  show: boolean
  onHide: () => void
}

export default function ViewProjectModal({
  project,
  show,
  onHide,
}: ViewProjectModalProps) {
  return (
    <MainModal
      title="Ficha completa do projeto"
      show={show}
      onHide={onHide}
      size="xl"
    >
      <ModalForm>
        <MainLabel htmlFor="author">Autor:</MainLabel>
        <MainInput
          id="author"
          type="text"
          value={project.author.name}
          disabled
        />
        <MainLabel htmlFor="title">Título:</MainLabel>
        <MainInput id="title" type="text" value={project.title} disabled />
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="complianceModel">
              Modelo de aplicação:
            </MainLabel>
            <MainInput
              id="complianceModel"
              type="text"
              value={project.complianceModel}
              disabled
            />
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="hours">
              Quantidade de horas solicitadas:
            </MainLabel>
            <MainInput
              id="hours"
              type="text"
              value={project.hours.proposed}
              disabled
            />
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="notice">Edital de referência:</MainLabel>
        <MainInput
          id="notice"
          type="text"
          value={project.notice.title}
          disabled
        />
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="topicsOfInterest">
              Tópicos de interesse:
            </MainLabel>
            <MainInput
              id="topicsOfInterest"
              type="text"
              value={project.topicsOfInterest.join(', ')}
              disabled
            />
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="sendDate">Data de envio:</MainLabel>
            <MainInput
              id="sendDate"
              type="text"
              value={project.sendDate ?? 'Não enviado'}
              disabled
            />
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="status">Status:</MainLabel>
            <MainInput
              id="status"
              type="text"
              value={project.status}
              disabled
            />
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="active">Situação:</MainLabel>
            <MainInput
              id="active"
              type="text"
              value={project.active ? 'Ativo' : 'Inativo'}
              disabled
            />
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="description">Descrição: *</MainLabel>
        <ViewDataEditor fieldValue={project.description} />
        <MainLabel htmlFor="objectives">Objetivos:</MainLabel>
        <ViewDataEditor fieldValue={project.objectives} />
        <MainLabel htmlFor="methodology">Metodologia:</MainLabel>
        <ViewDataEditor fieldValue={project.methodology} />
        <MainLabel htmlFor="justification">Justificativa:</MainLabel>
        <ViewDataEditor fieldValue={project.justification} />
        <MainLabel htmlFor="schedule">Cronograma:</MainLabel>
        <ViewDataEditor fieldValue={project.schedule} />
        <MainLabel htmlFor="references">Referências:</MainLabel>
        <ViewDataEditor fieldValue={project.references} />
        <ButtonsDiv justifyOption="right">
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
