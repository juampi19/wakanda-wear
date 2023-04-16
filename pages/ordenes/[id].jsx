import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'


const PaginaOrden = () => {
  return (
    <TiendaLayout titulo={'Resumen de la orden 1231233'} descripcionPagina={'Resumen de la orden'}>
      <Typography variant="h1" component={'h1'} sx={{ mb: 2 }}>Orden: ABC123
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ my: 2 }}
        label="Orden pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />


      <Grid container>
        <Grid item xs={12} sm={6} md={7} >
          {/*Listado de los productos */}
          <ListaCarrito editable={false} />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          {/*Ordenes */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

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

              <Divider sx={{ my: 1 }} />
              {/*Total de los productos */}
              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/carrito'} passHref legacyBehavior>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <ResumenOrden />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}

export default PaginaOrden