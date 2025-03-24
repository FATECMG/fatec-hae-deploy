import { MainModal, StyledP } from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

interface deleteCourseModalProps {
  id: string
  name: string
  handleDeleteCourse: (id: string) => void
  show: boolean
  onHide: () => void
}

export default function DeleteCourseModal({
  id,
  name,
  handleDeleteCourse,
  show,
  onHide,
}: deleteCourseModalProps) {
  function deleteSchool() {
    handleDeleteCourse(id)
  }

  return (
    <MainModal title="Excluir curso" show={show} onHide={onHide}>
      <StyledP>
        Tem certeza que deseja excluir o curso <strong>{name}</strong>?
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
          onClick={deleteSchool}
        >
          Excluir
        </MainButton>
      </ButtonsDiv>
    </MainModal>
  )
}
