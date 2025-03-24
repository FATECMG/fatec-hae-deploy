import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

interface SendReportModalProps {
  title: string
  show: boolean
  onHide: () => void
  handleSendProject: () => void
}

export default function SendReportModal({
  title,
  show,
  onHide,
  handleSendProject,
}: SendReportModalProps) {
  return (
    <MainModal title="Enviar relatório" onHide={onHide} show={show}>
      <StyledP>
        Tem certeza que deseja enviar o relatório do projeto
        <strong>{title}</strong> para avaliação?
      </StyledP>
      <StyledP>
        Após o envio, não será mais possível alterar o relatório.
      </StyledP>
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
          color="blue-400"
          hoverColor="blue-350"
          onClick={handleSendProject}
        >
          Enviar
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
