import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { CarritoContext } from "@/context"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react"


const PaginaCarrito = () => {

  const { numeroProductos } = useContext( CarritoContext );

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
                <Button fullWidth color="secondary" className="circular-btn">Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}

export default PaginaCarrito