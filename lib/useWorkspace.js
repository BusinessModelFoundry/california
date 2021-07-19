import { createContext, useContext } from 'react'

const WorkspaceContext = createContext(null)

export const WorkspaceContextProvider = WorkspaceContext.Provider

export const useWorkspace = () => {
  return useContext(WorkspaceContext)
}

export const useScale = () => [useWorkspace().scale, useWorkspace().setScale]
