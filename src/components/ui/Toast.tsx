import { useEffect, useState, memo } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

function ToastInner({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 200)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bg = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-[100] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-opacity duration-200 ${bg} ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {message}
    </div>
  )
}

export const Toast = memo(ToastInner)
