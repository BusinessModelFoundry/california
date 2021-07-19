import { useEffect, useRef } from 'react'

import { createDroppable } from './droppable'

const droppableTypes = new Set(['Workspace', 'Canvas'])

export const useDroppable = (id, type) => {
  const ref = useRef(null)

  useEffect(() => {
    const droppableRef = droppableTypes.has(type)
      ? createDroppable(id, ref.current)
      : null

    return () => {
      if (droppableRef) {
        droppableRef.remove()
      }
    }
  }, [id, type])

  return ref
}
