export const carritoReducer = ( state, action ) => {
  switch( action.type ){
    case '[Carrito] - Cargar Carrito desde cookies | storage':
      return {
        ...state,
      }

    default:
      return state  
  }
}