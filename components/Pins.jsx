import { useCallback } from 'react'

import { Pin } from '../components/Pin'
import { Sticky } from '../components/Sticky'
import { useStore } from '../lib/store'

const getPinsByParentId = (parentId) => (state) =>
  Object.values(state.pins).filter((pin) => pin.parentId === parentId)

export const Pins = ({ parentId = null }) => {
  const pins = useStore(getPinsByParentId(parentId))

  return (
    <>
      {Object.values(pins).map((pin) => (
        <Pin key={pin.id} {...pin} />
      ))}
    </>
  )
}
