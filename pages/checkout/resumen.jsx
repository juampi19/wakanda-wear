import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'


const PaginaResumen = () => {
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
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }}/>

              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/checkout/direccion'} passHref legacyBehavior>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography >usuario</Typography>
              <Typography >Pje.mesana 2719</Typography>
              <Typography >Quilpué</Typography>
              <Typography >Chile</Typography>
              <Typography >56988228323</Typography>

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

              <Box sx={{ mt:3 }}>
                <Button fullWidth color="secondary" className="circular-btn">Confirmar Orden</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}

export default PaginaResumen