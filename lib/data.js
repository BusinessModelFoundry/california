import produce from 'immer'
import { useReducer, createContext, useContext } from 'react'

const MOVE_DELTA = '@pins/MOVE_DELTA'

export const movePin = (id, position) => ({
  type: MOVE_DELTA,
  id,
  position,
})

export const DataContext = createContext(null)

const initialState = {
  stickies: {
    1: { id: '1', x: 100, y: 100, width: 100, height: 100 },
    2: { id: '2', x: 250, y: 250, width: 100, height: 100 },
  },
  pins: {
    1: { id: '1', x: 100, y: 100, width: 100, height: 100 },
    2: { id: '2', x: 250, y: 250, width: 100, height: 100 },
  },
}

const reducer = produce((state, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'MOVE': {
      state.pins[action.id].x = action.position.x
      state.pins[action.id].y = action.position.y
      return state
    }
    case MOVE_DELTA: {
      const { x, y } = state.pins[action.id]
      state.pins[action.id].x = x + action.position.x
      state.pins[action.id].y = y + action.position.y
      return state
    }
    default:
      throw new Error()
  }
})

export const useData = () => useReducer(reducer, initialState)

export const useDispatch = () => useContext(DataContext).dispatch
