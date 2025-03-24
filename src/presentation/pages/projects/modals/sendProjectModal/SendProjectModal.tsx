import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

interface SendProjectModalProps {
  projectId: string
  title: string
  show: boolean
  onHide: () => void
  handleSendProject: (id: string) => void
}

export default function SendProjectModal({
  projectId,
  title,
  show,
  onHide,
  handleSendProject,
}: SendProjectModalProps) {
  const sendProject = () => handleSendProject(projectId)

  return (
    <MainModal title="Enviar projeto" onHide={onHide} show={show}>
      <StyledP>
        Tem certeza que deseja enviar o projeto <strong>{title}</strong> para
        avaliação?
      </StyledP>
      <StyledP>Após o envio, não será mais possível alterar o projeto.</StyledP>
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
          onClick={sendProject}
        >
          Enviar
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
