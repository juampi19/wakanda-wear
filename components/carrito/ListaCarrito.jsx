import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { Contador } from '../ui';
import { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '@/context';



export const ListaCarrito = ({ editable }) => {

  const [ cargarCookies, setCargarCookies ] = useState(false);

  useEffect( () => {
    setCargarCookies(true);
  }, [] )

  const { carrito, actualizarCantidadProducto, eliminarProductoCarrito } = useContext( CarritoContext );


  const actualizarCantidadCarrito = ( producto, nuevaCantidad ) => {

    producto.cantidad = nuevaCantidad;
    
    actualizarCantidadProducto( producto );
  
  }


  const eliminarProducto = ( producto ) => {
    console.log( producto );
    eliminarProductoCarrito( producto );
  }

  const formatPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });

  return (
    <>
      {
        cargarCookies && carrito.map(producto => (
          <Grid container spacing={2} key={producto.slug + producto.talla} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              {/*Llevar a la pagina del producto */}
              <NextLink href={`/productos/${producto.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/productos/${producto.imagen}`}
                      component={'img'}
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant='body1'>{producto.titulo}</Typography>
                <Typography variant='body2'>Talla: <strong>{producto.talla}</strong></Typography>

                {/*condicional */}
                {
                  editable
                    ? <Contador 
                        cantidadActual={producto.cantidad}
                        valorMaximo={ 10 }
                        actualizarCantidad={(cantidad) => actualizarCantidadCarrito( producto, cantidad )}
                      />
                    : <Typography variant='h5'>{ producto.cantidad } { producto.Cantidad > 1 ? 'productos' : 'producto' }</Typography>
                }

              </Box>
            </Grid>

            <Grid item xs={0} mb={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <Typography variant='subtitle1'>{ formatPrice.format( producto.precio ) }</Typography>
              {/*Eliminar producto */}

              {
                editable && (
                  <Button variant='text' color='secondary'
                    onClick={ () => eliminarProducto( producto ) }
                  >
                    Remover
                  </Button>
                )
              }

            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
