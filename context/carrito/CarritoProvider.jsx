import { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';
import { carritoReducer } from './CarritoReducer';


const CARRITO_INITIAL_STATE = {
  carrito : []
}

export const CarritoProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer( carritoReducer, CARRITO_INITIAL_STATE);


  return (
    <CarritoContext.Provider value={{
      ...state,
    }}>

      {children}

    </CarritoContext.Provider>
  )
}