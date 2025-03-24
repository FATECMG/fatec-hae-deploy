import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'

interface DeleteNoticeModalProps {
  title: string
  show: boolean
  onHide: () => void
  handleDeleteNotice: () => void
}

export default function DeleteNoticeModal({
  title,
  onHide,
  show,
  handleDeleteNotice,
}: DeleteNoticeModalProps) {
  function deleteNotice() {
    handleDeleteNotice()
  }

  return (
    <MainModal title="Excluir edital" show={show} onHide={onHide}>
      <StyledP>
        Tem certeza que deseja excluir o edital <strong>{title}</strong>?
      </StyledP>
      <StyledP>Essa ação é irreversível!</StyledP>
      <ButtonsDiv>
        <MainButton
          type="button"
          color="black-400"
          hoverColor="black-350"
          onClick={onHide}
        >
          Fechar
        </MainButton>
        <MainButton
          type="button"
          color="red-400"
          hoverColor="red-350"
          onClick={deleteNotice}
        >
          Excluir
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
