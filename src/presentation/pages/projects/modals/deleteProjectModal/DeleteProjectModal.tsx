import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

interface DeleteProjectModalProps {
  projectId: string
  title: string
  show: boolean
  onHide: () => void
  handleDeleteProject: (id: string) => void
}

export default function DeleteProjectModal({
  projectId,
  title,
  show,
  onHide,
  handleDeleteProject,
}: DeleteProjectModalProps) {
  function deleteProject() {
    handleDeleteProject(projectId)
  }

  return (
    <MainModal title="Excluir projeto" onHide={onHide} show={show}>
      <StyledP>
        Tem certeza que deseja excluir o projeto <strong>{title}</strong>?
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
          onClick={deleteProject}
        >
          Excluir
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
