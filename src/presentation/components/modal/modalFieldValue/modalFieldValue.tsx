import { Container } from './Styles'
import { MainInput, MainLabel } from '../../form'

interface ModalInputProps {
  label: string
  value?: string
}

export default function modalFieldValue({ label, value }: ModalInputProps) {
  return (
    <Container>
      <MainLabel>{label}:</MainLabel>
      <MainInput value={value} disabled />
    </Container>
  )
}
