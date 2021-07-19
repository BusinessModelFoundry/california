import { useMemo, forwardRef } from 'react'

import { useScale } from '../lib/useWorkspace'

const getStyles = ({ scale }) => ({
  transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`,
})

export const Workspace = forwardRef(({ id, title, children }, ref) => {
  const [scale] = useScale()
  const style = useMemo(() => getStyles({ scale }), [scale])

  return (
    <div ref={ref} className="workspace" style={style}>
      {title}
      {children}
    </div>
  )
})

Workspace.displayName = 'Workspace'
