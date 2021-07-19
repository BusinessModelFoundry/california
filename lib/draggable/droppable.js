import { manager } from './manager'

export const createDroppable = (id, el) => {
  manager.registry.add(el)
  el.dataset.droppableId = id

  return {
    remove: () => {
      delete el.dataset.droppableId
      manager.registry.delete(el)
    },
  }
}
