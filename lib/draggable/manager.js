const resetManager = () => {
  manager.dragLayer = null
  manager.rootId = null
}

export const manager = {
  registry: new Set(),
  dragLayer: null,
  rootId: null,
  remove: resetManager,
}
