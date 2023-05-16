import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'


import { CarritoContext } from './CarritoContext';
import { carritoReducer } from './CarritoReducer';


const CARRITO_INITIAL_STATE = {
  carrito : Cookie.get('carrito') ? JSON.parse(Cookie.get('carrito')) : [],
  numeroProductos: 0,
  subtotal: 0,
  impuesto: 0,
  total: 0,
  carritoCargando: false
}

export const CarritoProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer( carritoReducer, CARRITO_INITIAL_STATE);

  /*useEffect leer las cookies y recarge el carrito */
  useEffect( () => {
    const carritoCookie = Cookie.get('carrito') ? JSON.parse( Cookie.get('carrito') ) : [];
    dispatch({ type: '[Carrito] - Cargar Carrito desde cookies | storage', payload: carritoCookie })
  }, [] )

  /*UseEffect para almacenar los productos en las cookies */
  useEffect(() => {
    Cookie.set('carrito', JSON.stringify( state.carrito ));
  },[ state.carrito ]);



  useEffect(() => {

    const numeroProductos = state.carrito.reduce( ( total, producto ) => producto.cantidad + total , 0 );

    const subtotal = state.carrito.reduce( ( total, producto ) => {
      return (producto.precio * producto.cantidad) + total;
    } , 0)

    const porcentajeImpuesto = Number( process.env.NEXT_PUBLIC_IMPUESTO || 0 );
    
    const totalOrden = {
      numeroProductos,
      subtotal,
      impuesto: subtotal * porcentajeImpuesto  ,
      total: subtotal * ( porcentajeImpuesto + 1) 

    }

    dispatch({ type: '[Carrito] - actualizar total orden', payload: totalOrden });

  },[ state.carrito ]);



  const agregarProductoCarrtio = ( producto ) => {
    
    //Verificamos si existe el producto
    const productoEnCarrito = state.carrito.some( productoState => productoState._id === producto._id );

    //Si no existo lo agregamos
    if( !productoEnCarrito ) return dispatch({ type: '[Carrito] - Agregar Producto', payload: [ ...state.carrito, producto ] });

    //Si el producto existe comprobamos la talla
    const productoDiferenteTalla = state.carrito.some( productoState => productoState._id === producto._id && productoState.talla === producto.talla );

    if( !productoDiferenteTalla ) return dispatch({ type: '[Carrito] - Agregar Producto', payload: [ ...state.carrito, producto ] });

    //Acomular la cantidad
    const actualizarProductos = state.carrito.map( productoState => {

      if( productoState._id !== producto._id ) return productoState;
      if( productoState.talla !== producto.talla ) return productoState;

      //Actualizar la cantidad
      productoState.cantidad += producto.cantidad;

      return productoState;
    } );

    dispatch({ type: '[Carrito] - Agregar Producto', payload: actualizarProductos  })

  }


  const actualizarCantidadProducto = ( producto ) => {
    dispatch({type: '[Carrito] - cambiar cantidad', payload: producto });
  }


  const eliminarProductoCarrito = ( producto ) => {
    dispatch({type: '[Carrito] - eliminar producto', payload: producto });
  }


  return (
    <CarritoContext.Provider value={{
      ...state,
      agregarProductoCarrtio,
      actualizarCantidadProducto,
      eliminarProductoCarrito
    }}>

      {children}

    </CarritoContext.Provider>
  )
}