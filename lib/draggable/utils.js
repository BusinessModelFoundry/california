import { manager } from './manager'

export const getElementForPosition = (current, [x, y]) =>
  document
    .elementsFromPoint(x, y)
    .find(
      (el) =>
        manager.registry.has(el) &&
        current.dataset.draggableId !== el.dataset.droppableId
    )

export const getElementIdForPosition = (current, position) => {
  const found = getElementForPosition(current, position)

  if (found) {
    return found.dataset.droppableId
  } else {
    return null
  }
}
