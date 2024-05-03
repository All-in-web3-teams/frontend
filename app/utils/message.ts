// toastMessages.ts
import { ToastOptions, toast } from 'react-toastify'

// 设置全局配置
const configure = (duration?: number | null): ToastOptions => ({
  position: 'top-center',
  autoClose: duration ?? 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
})

export const message = {
  success(msg: string, duration?: number | null) {
    toast.success(msg, configure(duration))
  },
  error(msg: string, duration?: number | null) {
    console.log('执行error: ', msg)

    toast.error(msg, configure(duration))
  },
  info(msg: string, duration?: number | null) {
    toast.info(msg, configure(duration))
  },
  warning(msg: string, duration?: number | null) {
    toast.warn(msg, configure(duration))
  },
  loading(msg: string, duration?: number | null) {
    // react-toastify does not support a 'loading' type by default,
    // so you might need to customize it or use info/warning as a substitute
    toast.info(msg, configure(duration)) // Example: Using info as a placeholder
  }
}
