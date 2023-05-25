import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { CarritoContext } from "@/context"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'
import { useContext, useEffect, useState } from "react";
import { ciudades } from '@/utils';
import Cookies from "js-cookie"
import { useRouter } from "next/router"


const PaginaResumen = () => {
  const router = useRouter();

  const { direccionCompra, numeroProductos, crearOrden } = useContext( CarritoContext );

  const [realizado, setRealizado] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    if( !Cookies.get('nombre') || !Cookies.get('carrito')){
      router.push('/checkout/direccion')
    }
  }, [router])

  if( !direccionCompra ){
    return <></>
  }

  const { nombre, apellido, direccion, ciudad, codigo, pais, telefono } = direccionCompra;


  const obtenerPais = ( paisCode ) => {
    const paisSeleccionado = ciudad.find( pais => pais.code === paisCode );

    return paisSeleccionado.name
  }

  const onCrearOrden = async() => {
    setRealizado(true);

    const { hasError, message } = await crearOrden();

    if( hasError ){
      setRealizado(false);

      setMensajeError( message );
      return;
    }

    router.replace(`/ordenes/${ message }`);
  }

  return (
    <TiendaLayout titulo={'Resumen de compra'} descripcionPagina={'Resumen de la orden'}>
      <Typography variant="h1" component={'h1'} sx={{ mb: 2 }}>Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={6} md={7} >
          {/*Listado de los productos */}
          <ListaCarrito editable={false}/>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          {/*Ordenes */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({numeroProductos} { numeroProductos > 1 ?'productos' : 'producto' })</Typography>
              <Divider sx={{ my: 1 }}/>

              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/checkout/direccion'} passHref legacyBehavior>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography >{ nombre } { apellido}</Typography>
              <Typography >{ direccion }</Typography>
              <Typography >{ciudad}, {codigo} </Typography>
              <Typography >{ pais }</Typography>
              <Typography >{ telefono }</Typography>

              <Divider sx={{ my: 1 }}/>
              {/*Total de los productos */}
              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/carrito'} passHref legacyBehavior>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <ResumenOrden />

              <Box sx={{ mt:3 }} display={'flex'} flexDirection={'column'}>
                <Button 
                fullWidth 
                color="secondary" 
                className="circular-btn"
                onClick={ onCrearOrden }
                disabled={ realizado }
                >Confirmar Orden</Button>

                <Chip 
                  color="error"
                  label={mensajeError}
                  sx={{ display: mensajeError ? 'flex':'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}

export default PaginaResumen