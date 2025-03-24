import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { UpdatedButtonsDiv } from '@/presentation/pages/schools/modals/schoolModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'

import { User } from '@/domain/user/entities/User'
import {
  MainModal,
  ModalFieldValue,
  ModalForm,
} from '@/presentation/components'

interface UserModalProps {
  user: User
  onHide: () => void
  show: boolean
}

export default function UserModal({ user, onHide, show }: UserModalProps) {
  return (
    <MainModal
      title="Ficha completa do usuário"
      show={show}
      onHide={onHide}
      size="lg"
    >
      <ModalForm>
        <ModalFieldValue value={user.name} label="Nome do usuário" />
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue
              value={user.active ? 'Ativo' : 'Inativo'}
              label="Situação"
            />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue
              value={user.registerNumber}
              label="Número de registro"
            />
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={user.academicTitle} label="Titulação" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue value={user.roles} label="Cargo" />
          </InputDiv>
        </AlignedInputs>
        {user.courses.length > 0 && (
          <ModalFieldValue
            value={user.courses.map((course) => course.name).join(', ')}
            label="Cursos ministrados"
          />
        )}
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={user.phone} label="Telefone" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue value={user.email} label="Email" />
          </InputDiv>
        </AlignedInputs>
        <UpdatedButtonsDiv>
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
        </UpdatedButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
