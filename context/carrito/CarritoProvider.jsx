import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'


import { CarritoContext } from './CarritoContext';
import { carritoReducer } from './CarritoReducer';
import { wakandaApi } from '@/api';


const CARRITO_INITIAL_STATE = {
  carrito : Cookie.get('carrito') ? JSON.parse(Cookie.get('carrito')) : [],
  numeroProductos: 0,
  subtotal: 0,
  impuesto: 0,
  total: 0,
  carritoCargando: false,
  direccionCompra: {}
}

export const CarritoProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer( carritoReducer, CARRITO_INITIAL_STATE);

  /*useEffect leer las cookies y recarge el carrito */
  useEffect( () => {
    const carritoCookie = Cookie.get('carrito') ? JSON.parse( Cookie.get('carrito') ) : [];
    dispatch({ type: '[Carrito] - Cargar Carrito desde cookies | storage', payload: carritoCookie })
  }, [] );


  useEffect(() => {
    const direccionCookies = Cookie.get('nombre') ? {
      nombre : Cookie.get('nombre') || '',
      apellido : Cookie.get('apellido') || '',
      direccion : Cookie.get('direccion') || '',
      direccion2 : Cookie.get('direccion2') || '',
      codigo : Cookie.get('codigo') || '',
      ciudad : Cookie.get('ciudad') || '',
      pais : Cookie.get('pais') || '',
      telefono : Cookie.get('telefono') || ''
    } : {}
  
    dispatch({ type: '[Carrito] - obtener direccion desde cookies', payload: direccionCookies })
    
  }, [])
  

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


  const actualizarDireccion = ( direccion ) => {

    Cookie.set( 'nombre', direccion.nombre );
    Cookie.set( 'apellido', direccion.apellido );
    Cookie.set( 'direccion', direccion.direccion );
    Cookie.set( 'direccion2', direccion.direccion2 );
    Cookie.set( 'codigo', direccion.codigo );
    Cookie.set( 'ciudad', direccion.ciudad );
    Cookie.set( 'pais', direccion.pais );
    Cookie.set( 'telefono', direccion.telefono );


    dispatch({ type: '[Carrito] - actualizar direccion desde cookies', payload: direccion })
  }


  const crearOrden = async( ) => {

    if( !state.direccionCompra ){
      throw new Error( 'No hay dirección de entrega' )
    }

    const body = {
      itemOrden: state.carrito,
      direccionCompra: state.direccionCompra,
      numeroDeItems: state.numeroProductos,
      subtotal: state.subtotal,
      impuesto: state.impuesto,
      total: state.total,
      pagado: false

    }


    try {
      
      const { data } = await wakandaApi.post('/ordenes', body);

      console.log( data )

    } catch (error) {
      console.log( error )
    }

  }

  return (
    <CarritoContext.Provider value={{
      ...state,
      agregarProductoCarrtio,
      actualizarCantidadProducto,
      eliminarProductoCarrito,
      actualizarDireccion,

      //Ordnes
      crearOrden,
    }}>

      {children}

    </CarritoContext.Provider>
  )
}