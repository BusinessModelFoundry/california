import { useEffect, useRef } from 'react'

import { useScale } from '../useWorkspace'
import { createDraggable } from './draggable'

export const useDraggable = (id, options) => {
  const ref = useRef(null)
  const draggableRef = useRef(null)
  const [scale] = useScale()

  useEffect(() => {
    draggableRef.current = createDraggable(ref.current, id, options)

    return () => draggableRef.current.destroy()
  }, [id, options])

  useEffect(() => {
    draggableRef.current.setScale(scale)
  }, [scale])

  return ref
}
