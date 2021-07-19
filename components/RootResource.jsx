import { memo } from 'react'

import { useDragLayer } from '../lib/draggable/useDragLayer'
import { DragLayer } from './DragLayer'
import { Resource } from './Resource'

export const RootResource = memo(({ id }) => {
  const dragLayerRef = useDragLayer(id)

  return (
    <>
      <Resource id={id} />
      <DragLayer ref={dragLayerRef} />
    </>
  )
})

RootResource.displayName = 'RootResource'
