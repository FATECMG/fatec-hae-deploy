import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'
import { MainModal, StyledP } from '@/presentation/components'

interface DeleteUserModalProps {
  show: boolean
  onHide: () => void
  userId: string
  username: string
  handleDeleteUser: (id: string) => void
}

export default function DeleteUserModal({
  show,
  onHide,
  userId,
  username,
  handleDeleteUser,
}: DeleteUserModalProps) {
  function deleteUser() {
    handleDeleteUser(userId)
  }

  return (
    <MainModal title="Excluir usuário" show={show} onHide={onHide}>
      <StyledP>
        Tem certeza que deseja excluir o usuário <strong>{username}</strong>?
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
          onClick={deleteUser}
        >
          Excluir
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
