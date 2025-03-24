import { useState } from 'react'

export function useModal() {
  const [show, setShow] = useState(false)

  function openModal() {
    setShow(true)
  }

  function closeModal() {
    setShow(false)
  }

  return {
    show,
    openModal,
    closeModal,
  }
}
