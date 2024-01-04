import { ref, Ref } from 'vue'

import { Notification } from '../types/notifications'

export default function useToast() {
  const toasts: Ref<Notification[]> = ref([])

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  const addToast = (message: string, type: string, timer = 3000) => {
    const id = Date.now()
    const toast: Notification = { id, message, type }
    toasts.value.push(toast)
    setTimeout(() => removeToast(id), timer)
  }

  return { toasts, removeToast, addToast }
}
