import { normalizeCep } from '@/presentation/utils/Masks'
import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'

import { UpdatedButtonsDiv } from './Styles'
import { Address } from '@/domain/address/entities/Address'
import {
  MainModal,
  ModalFieldValue,
  ModalForm,
} from '@/presentation/components'

interface SchoolModalProps {
  name: string
  active: boolean
  address: Address
  show: boolean
  onHide: () => void
}

export default function SchoolModal({
  name,
  active,
  address,
  show,
  onHide,
}: SchoolModalProps) {
  return (
    <MainModal
      title="Ficha completa da escola"
      show={show}
      size="lg"
      onHide={onHide}
    >
      <ModalForm>
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={name} label="Nome da instituição" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue
              value={active ? 'Ativa' : 'Inativa'}
              label="Situação"
            />
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue
              value={normalizeCep(address.postCode)}
              label="CEP"
            />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue value={address.number} label="Número" />
          </InputDiv>
        </AlignedInputs>
        <ModalFieldValue value={address.complement} label="Complemento" />
        <ModalFieldValue value={address.street} label="Logradouro" />
        <ModalFieldValue value={address.district} label="Bairro" />
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={address.state} label="Estado" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue value={address.city} label="Cidade" />
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
