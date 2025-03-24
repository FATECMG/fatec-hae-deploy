import {
  MainInput,
  MainLabel,
  MainModal,
  MainTextArea,
  ModalForm,
} from '@/presentation/components'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  TopicOfInterestCard,
  TopicsOfInterestCardContainer,
} from '../createNoticeModal/Styles'
import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { Notice } from '@/domain/notice/entities/Notice'

interface ViewNoticeModalProps {
  notice: Notice
  show: boolean
  onHide: () => void
}

export default function ViewNoticeModal({
  notice,
  show,
  onHide,
}: ViewNoticeModalProps) {
  return (
    <>
      <MainModal
        title="Ficha completa do edital"
        show={show}
        onHide={onHide}
        size="lg"
      >
        <ModalForm>
          <MainLabel htmlFor="title">Título:</MainLabel>
          <MainInput id="title" type="text" value={notice.title} disabled />
          <AlignedInputs>
            <InputDiv>
              <MainLabel htmlFor="title">Curso de referência:</MainLabel>
              <MainInput
                id="title"
                type="text"
                value={notice.course.name}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <MainLabel htmlFor="situation">Situação:</MainLabel>
              <MainInput
                id="situation"
                type="text"
                value={notice.active ? 'Ativo' : 'Inativo'}
                disabled
              />
            </InputDiv>
          </AlignedInputs>
          <MainLabel htmlFor="topicsOfInterest">
            Tópicos de interesse:
          </MainLabel>
          <TopicsOfInterestCardContainer>
            {notice.topicsOfInterest.map((topic, index) => (
              <TopicOfInterestCard key={index}>
                <p>{topic}</p>
              </TopicOfInterestCard>
            ))}
          </TopicsOfInterestCardContainer>
          <MainLabel htmlFor="description">Descrição:</MainLabel>
          <MainTextArea
            id="description"
            rows={10}
            value={notice.description}
            disabled
          />
          <AlignedInputs>
            <InputDiv>
              <MainLabel htmlFor="semester">Semestre:</MainLabel>
              <MainInput
                id="semester"
                type="text"
                value={notice.semester}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <MainLabel htmlFor="year">Ano:</MainLabel>
              <MainInput id="year" type="text" value={notice.year} disabled />
            </InputDiv>
          </AlignedInputs>
          <MainLabel htmlFor="openDate">
            Data de início de recebimento de projetos:
          </MainLabel>
          <MainInput
            id="openDate"
            type="text"
            value={notice.openDate}
            disabled
          />
          <MainLabel htmlFor="closeDate">
            Data de fim de recebimento de projetos:
          </MainLabel>
          <MainInput
            id="closeDate"
            type="text"
            value={notice.closeDate}
            disabled
          />
          <MainLabel htmlFor="evaluationEndDate">
            Data limite de avaliação:
          </MainLabel>
          <MainInput
            id="evaluationEndDate"
            type="text"
            value={notice.evaluationEndDate}
            disabled
          />
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
    </>
  )
}
