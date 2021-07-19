import { manager } from './manager'
import { DraggablePreview } from './preview'
import { getElementForPosition, getElementIdForPosition } from './utils'
import { subtract } from './vector'

class DragResult {
  constructor(draggable) {
    this.target = draggable.target
    this.center = draggable.preview.getPosition()
    this._cache = {}
  }

  get position() {
    return this.getCache('position', () => {
      return subtract(this.center, this.parentPosition)
    })
  }

  get parent() {
    return this.getCache('parent', () =>
      this._elementsFromCenter().find(
        (el) =>
          manager.registry.has(el) &&
          this.target.dataset.draggableId !== el.dataset.droppableId
      )
    )
  }

  get parentId() {
    return this.parent ? this.parent.dataset.droppableId : null
  }

  get parentPosition() {
    return this.getCache('parentPosition', () => {
      const { x, y } = this.parent.getBoundingClientRect()
      return [x, y]
    })
  }

  _elementsFromCenter() {
    return this.getCache('_elementsFromCenter', () => {
      const [x, y] = this.center
      return document.elementsFromPoint(x, y)
    })
  }

  getCache(key, fn) {
    if (!this._cache[key]) {
      this._cache[key] = fn()
    }

    return this._cache[key]
  }
}

class Draggable {
  constructor(target, id, options = {}) {
    this.dragging = false
    this.preview = null
    this.offset = null
    this.start = null
    this.target = target
    this.id = id
    this._options = options
    this._registerHandlers()
    this._registerUserHandlers(options)
    target.dataset.draggableId = id
    target.addEventListener('pointerdown', this._handlers.onDragStart)
  }

  destroy() {
    this.target.removeEventListener('pointerdown', this._handlers.onDragStart)
  }

  _registerHandlers() {
    this._handlers = {
      onDragStart: this.onDragStart.bind(this),
      onDrag: this.onDrag.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
    }
  }

  _registerUserHandlers({ onDragStart, onDrag, onDragEnd }) {
    this._userHandlers = {}
    Object.entries({ onDragStart, onDrag, onDragEnd }).forEach(
      ([eventName, callback]) => {
        if (callback) {
          this._userHandlers[eventName] = callback
        }
      }
    )
  }

  setScale(scale) {
    this.scale = scale
  }

  onDragStart(ev) {
    ev.stopPropagation()
    this.offset = [ev.offsetX, ev.offsetY]
    this.start = this.getPosition(ev)
    this.listenEvents()
  }

  onDrag(ev) {
    this.activateDragging(ev)
    this.preview.transform(this.getDelta(ev))
  }

  onDragEnd(ev) {
    this.unlistenEvents()

    if (this.didMove(ev)) {
      if (this._userHandlers.onDragEnd) {
        const center = this.preview.getPosition()
        this._userHandlers.onDragEnd(new DragResult(this))
        // this._userHandlers.onDragEnd(this.getDropResult())
      }
      this.deactivateDragging()
    }
  }

  getPosition(ev) {
    return subtract([ev.clientX, ev.clientY], this.offset)
  }

  getDelta(ev) {
    return subtract(this.getPosition(ev), this.start)
  }

  getDropTarget(point) {
    return getElementIdForPosition(this.target, point)
  }

  getRelativePosition(point) {
    const parentRect = getElementForPosition(
      this.target,
      point
    ).getBoundingClientRect()

    return subtract(point, [parentRect.x, parentRect.y])
  }

  didMove(ev) {
    const [x, y] = this.getDelta(ev)
    return this.dragging && (x !== 0 || y !== 0)
  }

  getDropResult() {
    const center = this.preview.getPosition()

    return {
      parentId: this.getDropTarget(center),
      position: this.getRelativePosition(center),
    }
  }

  activateDragging() {
    if (!this.dragging) {
      this.dragging = true
      this.preview = new DraggablePreview(this.target)
    }
  }

  deactivateDragging() {
    this.dragging = false
    this.preview.destroy()
    this.preview = null
  }

  listenEvents() {
    document.addEventListener('pointermove', this._handlers.onDrag)
    document.addEventListener('pointerup', this._handlers.onDragEnd)
  }

  unlistenEvents() {
    document.removeEventListener('pointermove', this._handlers.onDrag)
    document.removeEventListener('pointerup', this._handlers.onDragEnd)
  }
}

export const createDraggable = (target, id, options) => {
  return new Draggable(target, id, options)
}
