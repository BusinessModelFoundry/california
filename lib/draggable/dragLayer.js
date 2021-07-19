import { manager } from './manager'

export const createDragLayer = (dragLayer, rootId) => {
  manager.dragLayer = dragLayer
  manager.rootId = rootId

  return manager
}

export const createPreview = (target) => {
  const preview = target.cloneNode(true)
  const rect = target.getBoundingClientRect()
  preview.style.left = `${rect.left}px`
  preview.style.top = `${rect.top}px`
  manager.dragLayer.appendChild(preview)
  target.style.opacity = 0

  return preview
}
