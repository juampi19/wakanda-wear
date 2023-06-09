import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { CarritoContext } from "@/context"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"


const PaginaCarrito = () => {

  const { numeroProductos, carritoCargando } = useContext( CarritoContext );
  const router = useRouter();

  useEffect( () => {

    if( carritoCargando && numeroProductos === 0) {
      router.replace('/carrito/vacia');
    }

  } , [carritoCargando, numeroProductos, router]);

  if( !carritoCargando || numeroProductos === 0 ) {
    return (<></>);
  }

  return (
    <TiendaLayout titulo={`Carrito - ${numeroProductos}`} descripcionPagina={'Carrito de compras de la tienda'}>
      <Typography variant="h1" component={'h1'} sx={{ mb: 2 }}>Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={6} md={7} >
          {/*Listado de los productos */}
          <ListaCarrito editable/>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          {/*Ordenes */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }}/>

              {/*Total de los productos */}
              <ResumenOrden />

              <Box sx={{ mt:3 }}>
                <Button 
                fullWidth 
                color="secondary" 
                className="circular-btn"
                href="/checkout/direccion"
                >Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}

export default PaginaCarrito