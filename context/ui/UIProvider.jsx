import { useReducer } from "react"
import { UIContext } from "./UIContexts";
import { uiReducer } from "./UIReducer";

const UI_INITIAL_STATE = {
  isMenuOpen: false
}

export const UIProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE);

  const mostrarSlideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' });
  }

  return (
    <UIContext.Provider value={{
      ...state,

      mostrarSlideMenu
    }}>

      {children}

    </UIContext.Provider>
  )
}