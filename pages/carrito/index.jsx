import { ListaCarrito } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"


const PaginaCarrito = () => {
  return (
    <TiendaLayout titulo={'Carrito - 3'} descripcionPagina={'Carrito de compras de la tienda'}>
      <Typography variant="h1" component={'h1'}>Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <ListaCarrito />
        </Grid>

        <Grid item xs={12} sm={5}>
          {/*Ordenes */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }}/>

              {/*Lista de los productos */}

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