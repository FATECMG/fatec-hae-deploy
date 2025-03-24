import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

interface DeleteReportModalProps {
  title: string
  show: boolean
  onHide: () => void
  handleDeleteProject: () => void
}

export default function DeleteReportModal({
  title,
  show,
  onHide,
  handleDeleteProject,
}: DeleteReportModalProps) {
  return (
    <MainModal title="Excluir relatório" onHide={onHide} show={show}>
      <StyledP>
        Tem certeza que deseja excluir o relatório do projeto{' '}
        <strong>{title}</strong>?
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
          onClick={handleDeleteProject}
        >
          Excluir
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
