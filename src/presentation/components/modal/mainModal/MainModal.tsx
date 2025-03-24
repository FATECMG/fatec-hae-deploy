import { ReactNode } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ModalHeaderContainer, Title } from './Styles'

interface ModalProps {
  title: string
  size?: 'sm' | 'lg' | 'xl'
  escapeKey?: boolean
  closable?: boolean | 'static'
  show: boolean
  onHide: () => void
  children: ReactNode
  animationOnEnter?: boolean
}

export default function MainModal({
  children,
  title,
  escapeKey = false,
  closable = true,
  show,
  onHide,
  size = undefined,
  animationOnEnter = true,
}: ModalProps) {
  return (
    <Modal
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={escapeKey}
      onHide={onHide}
      backdrop={closable}
      style={{ scrollBehavior: 'smooth' }}
      animation={animationOnEnter}
    >
      <ModalHeaderContainer>
        <Title id="contained-modal-title-vcenter">{title}</Title>
      </ModalHeaderContainer>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
