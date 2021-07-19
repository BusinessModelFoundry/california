import { forwardRef } from 'react'

export const Sticky = forwardRef(({ title }, ref) => {
  return (
    <div ref={ref} className="sticky">
      {title}
    </div>
  )
})

Sticky.displayName = 'Sticky'
