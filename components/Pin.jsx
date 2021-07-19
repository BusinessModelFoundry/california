import { memo, useMemo, useCallback } from 'react'

import { useDraggable } from '../lib/draggable/useDraggable'
import { useStore } from '../lib/store'
import { Resource } from './Resource'

export const useStyle = ({ x, y, width, height, depth }) =>
  useMemo(
    () => ({
      left: x - width / 2,
      top: y - height / 2,
      width,
      height,
      zIndex: depth,
    }),
    [x, y, width, height, depth]
  )

const useDrop = (id) => {
  const moveTo = useStore((state) => state.moveTo)

  return useCallback(
    (position, parentId) => {
      moveTo(id, position, parentId)
    },
    [id, moveTo]
  )
}

export const Pin = memo(({ id, x, y, width, height, depth, resourceId }) => {
  const style = useStyle({ x, y, width, height, depth })
  const handleDrop = useDrop(id)
  const ref = useDraggable(id, {
    onDragEnd: (result) => {
      console.log('result', result)
      handleDrop(result.position, result.parentId)
    },
  })

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div ref={ref} className="pin" style={style} onClick={handleClick}>
      <Resource id={resourceId} />
    </div>
  )
})
