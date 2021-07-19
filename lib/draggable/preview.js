import { manager } from './manager'

export class DraggablePreview {
  constructor(original) {
    this.original = original
    this.initialize()
  }

  destroy() {
    this.original.style.opacity = 1
    this.preview.remove()
  }

  initialize() {
    this.preview = this.original.cloneNode(true)
    const rect = this.original.getBoundingClientRect()
    this.preview.style.left = `${rect.left}px`
    this.preview.style.top = `${rect.top}px`
    manager.dragLayer.appendChild(this.preview)
    this.original.style.opacity = 0
  }

  getPosition() {
    const previewRect = this.preview.getBoundingClientRect()
    return [
      previewRect.x + previewRect.width / 2,
      previewRect.y + previewRect.height / 2,
    ]
  }

  transform([x, y]) {
    this.preview.style.transform = `matrix(1, 0, 0, 1, ${x}, ${y})`
  }
}
