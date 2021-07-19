import { useMemo, useState, useRef, useEffect } from 'react'

import { RootResource } from '../components/RootResource'
import { WorkspaceContextProvider } from '../lib/useWorkspace'

const createViewport = (viewer) => {
  const target = viewer.firstChild
  console.log('target', target)
  const control = {
    position: {
      x: 0,
      y: 0,
    },
  }

  const setPosition = (x, y) => {
    const viewerWidth = viewer.offsetWidth
    const width = target.offsetWidth
    const minX = -width + viewerWidth
    const viewerHeight = viewer.offsetHeight
    const height = target.offsetHeight
    const minY = -height + viewerHeight

    if (x < minX) {
      control.position.x = minX
    } else if (x > 0) {
      control.position.x = 0
    } else {
      control.position.x = x
    }
    if (y < minY) {
      control.position.y = minY
    } else if (y > 0) {
      control.position.y = 0
    } else {
      control.position.y = y
    }
    target.style.transform = `matrix(1, 0, 0, 1, ${control.position.x}, ${control.position.y})`
  }

  const addDelta = (delta) => {
    const { x, y } = control.position
    setPosition(x - delta.x, y - delta.y)
  }

  target.style.transformOrigin = '0px 0px'
  setPosition(0, 0)

  const wheel = (ev) => {
    ev.preventDefault()
    addDelta({ x: ev.deltaX, y: ev.deltaY })
  }

  viewer.addEventListener('wheel', wheel)
}

const useViewport = () => {
  const ref = useRef(null)

  useEffect(() => {
    createViewport(ref.current)
  }, [])

  return ref
}

export default function Home() {
  const viewportRef = useViewport()
  const [scale, setScale] = useState(1)

  const workspace = useMemo(() => ({ scale, setScale }), [scale, setScale])

  return (
    <WorkspaceContextProvider value={workspace}>
      <div className="viewer" ref={viewportRef}>
        <RootResource id="1" />
      </div>
    </WorkspaceContextProvider>
  )
}
