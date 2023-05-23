

export const carritoReducer = ( state, action ) => {
  switch( action.type ){
    case '[Carrito] - Cargar Carrito desde cookies | storage':
      return {
        ...state,
        carritoCargando: true,
        carrito: [ ...action.payload ]
      }
    case '[Carrito] - Agregar Producto':
      return {
        ...state,
        carrito: [ ...action.payload ]
      }
    case '[Carrito] - cambiar cantidad':
      return{
        ...state,
        carrito: state.carrito.map( producto => {
          if( producto._id !== action.payload._id ) return producto;
          if( producto.talla !== action.payload.talla ) return producto;

          //Regresamos el producto actualizado
          return action.payload;

        } )
      }
    case '[Carrito] - eliminar producto':
    return{
      ...state,
      carrito: state.carrito.filter( producto => {
        if( producto._id !== action.payload._id ) return producto;
        if( producto.talla !== action.payload.talla) return producto;
      } )
    }
    
    case '[Carrito] - actualizar total orden':
      return {
        ...state,
        ...action.payload
      }

    case '[Carrito] - obtener direccion desde cookies':
      return{
        ...state,
        direccionCompra: {...action.payload}
      }
      
    case '[Carrito] - actualizar direccion desde cookies':
      return{
        ...state,
        direccionCompra: {...action.payload}
      }    
    default:
      return state  
  }
}