import { forwardRef } from 'react'

export const Canvas = forwardRef(({ id, title, children }, ref) => {
  return (
    <div ref={ref} className="canvas">
      {title}
      {children}
    </div>
  )
})

Canvas.displayName = 'Canvas'
