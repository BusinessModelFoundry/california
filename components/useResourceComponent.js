import { useMemo } from 'react'

import { Canvas } from '../components/Canvas'
import { Sticky } from '../components/Sticky'
import { Workspace } from '../components/Workspace'

export const resourceComponents = {
  Workspace: Workspace,
  Canvas: Canvas,
  Sticky: Sticky,
}

export const useResourceComponent = (type) =>
  useMemo(() => resourceComponents[type], [type])
