import { MainButton } from '@/presentation/components/buttons/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'

import { Course } from '@/domain/course/entities/Course'
import {
  MainModal,
  ModalFieldValue,
  ModalForm,
} from '@/presentation/components'

interface CourseModalProps {
  course: Course
  show: boolean
  onHide: () => void
}

export default function CourseModal({
  course,
  show,
  onHide,
}: CourseModalProps) {
  return (
    <MainModal
      title="Ficha completa do curso"
      show={show}
      onHide={onHide}
      size="lg"
    >
      <ModalForm>
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={course.name} label="Nome do curso" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue
              value={course.active ? 'Ativo' : 'Inativo'}
              label="Situação"
            />
          </InputDiv>
        </AlignedInputs>
        <AlignedInputs>
          <InputDiv>
            <ModalFieldValue value={course.acronym} label="Acrônimo" />
          </InputDiv>
          <InputDiv>
            <ModalFieldValue value={course.code} label="Código" />
          </InputDiv>
        </AlignedInputs>
        <InputDiv>
          <ModalFieldValue value={course.schedule.join(', ')} label="Horário" />
        </InputDiv>
        <InputDiv>
          <ModalFieldValue value={course.coordinator} label="Coordenador" />
        </InputDiv>
        <ButtonsDiv justifyOption="right">
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
