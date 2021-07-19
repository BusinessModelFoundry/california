import { memo, useCallback } from 'react'

import { useDroppable } from '../lib/draggable/useDroppable'
import { useStore } from '../lib/store'
import { Pins } from './Pins'
import { useResourceComponent } from './useResourceComponent'

export const Resource = memo(({ id }) => {
  const resource = useStore(useCallback((state) => state.resources[id], [id]))
  const ResourceComponent = useResourceComponent(resource.type)
  const ref = useDroppable(id, resource.type)

  return (
    <ResourceComponent id={id} title={resource.title} ref={ref}>
      <Pins parentId={id} />
    </ResourceComponent>
  )
})

Resource.displayName = 'Resource'
