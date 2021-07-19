import { useRef, useEffect } from 'react'

import { createDragLayer } from './dragLayer'

export const useDragLayer = (id) => {
  const ref = useRef(null)
  const managerRef = useRef(null)

  useEffect(() => {
    managerRef.current = createDragLayer(ref.current, id)
    return () => {
      managerRef.current.remove()
    }
  }, [id])

  return ref
}
