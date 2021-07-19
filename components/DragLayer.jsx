import { useMemo, forwardRef } from 'react'

import { useScale } from '../lib/useWorkspace'

const getStyles = ({ scale }) => ({
  transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`,
})

export const DragLayer = forwardRef((props, ref) => {
  const [scale] = useScale()
  const style = useMemo(() => getStyles({ scale }), [scale])

  return <div className="drag-layer" style={style} ref={ref} />
})

DragLayer.displayName = 'DragLayer'
