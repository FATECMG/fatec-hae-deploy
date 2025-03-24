import 'react-toastify/dist/ReactToastify.css'

import { ToastOptions, toast } from 'react-toastify'

interface toastProps {
  message: string
  type: 'success' | 'warning' | 'error' | 'custom'
  icon?: string
}

function Toast({ message, type, icon }: toastProps) {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  }

  if (isCustom(type)) {
    return toast(message, { ...options, icon })
  } else {
    return toast[type](message, options)
  }
}

function isCustom(arg: string): arg is 'custom' {
  return arg === 'custom'
}

export default Toast
