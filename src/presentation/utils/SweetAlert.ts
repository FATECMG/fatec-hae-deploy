import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const alert = withReactContent(Swal)

export const Alert = {
  fire: (options: SweetAlertOptions) => alert.fire(options),
  disconnected: (callback: VoidFunction) => {
    callback()
    alert.fire({
      icon: 'error',
      title: 'Desconectado',
      text: 'Sua sessão expirou, faça login novamente para continuar!',
    })
  },
}
