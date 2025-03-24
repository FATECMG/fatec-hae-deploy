import { MainButton } from '@/presentation/components/buttons/Styles'

import { ButtonsDiv } from '@/presentation/pages/users/modals/createUserModal/Styles'

import { MainModal, StyledP } from '@/presentation/components'

interface DeleteSchoolModalProps {
  show: boolean
  name: string
  onHide: () => void
  schoolId: string
  handleDeleteSchool: (id: string) => void
}

export default function DeleteSchoolModal({
  show,
  onHide,
  name,
  schoolId,
  handleDeleteSchool,
}: DeleteSchoolModalProps) {
  function deleteSchool() {
    handleDeleteSchool(schoolId)
  }

  return (
    <MainModal title="Excluir escola" show={show} onHide={onHide}>
      <StyledP>
        Tem certeza que deseja excluir essa escola <strong>{name}</strong>?
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
