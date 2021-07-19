import produce from 'immer'
import create from 'zustand'

// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState =
        typeof partial === 'function' ? produce(partial) : partial
      return set(nextState, replace)
    },
    get,
    api
  )

export const useStore = create(
  immer((set) => ({
    pins: {
      1: {
        id: '1',
        parentId: null,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        resourceId: '1',
        depth: 3,
      },
      2: {
        id: '2',
        parentId: '1',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        resourceId: '2',
        depth: 3,
      },
      3: {
        id: '3',
        parentId: '4',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        resourceId: '3',
        depth: 2,
      },
      4: {
        id: '4',
        parentId: '1',
        x: 300,
        y: 500,
        width: 500,
        height: 300,
        resourceId: '4',
        depth: 1,
      },
      5: {
        id: '5',
        parentId: '1',
        x: 1400,
        y: 1400,
        width: 100,
        height: 100,
        resourceId: '5',
        depth: 4,
      },
    },
    resources: {
      1: { id: '1', type: 'Workspace', title: 'Workspace' },
      2: { id: '2', type: 'Sticky', title: 'Sticky 1' },
      3: { id: '3', type: 'Sticky', title: 'Sticky 2' },
      4: { id: '4', type: 'Canvas', title: 'Canvas 1' },
      5: { id: '5', type: 'Sticky', title: 'Sticky 3' },
    },
    moveBy: (id, delta) =>
      set((state) => {
        const { x, y } = state.pins[id]
        state.pins[id].x = x + delta.x
        state.pins[id].y = y + delta.y
      }),
    moveTo: (id, [x, y], parentId) =>
      set((state) => {
        state.pins[id].x = x
        state.pins[id].y = y
        state.pins[id].parentId = parentId
      }),
  }))
)

export const useSet = () => useStore((state) => state.set)
