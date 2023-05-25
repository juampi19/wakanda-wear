import { ListaCarrito, ResumenOrden } from "@/components/carrito"
import { TiendaLayout } from "@/components/layouts"
import { dbOrdenes } from "@/database"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { getSession } from "next-auth/react"
import NextLink from 'next/link'


const PaginaOrden = ({orden}) => {

  const { direccionCompra, numeroDeItems, itemOrden } = orden;

  return (
    <TiendaLayout titulo={`Resumen de la orden`} descripcionPagina={'Resumen de la orden'}>
      <Typography variant="h1" component={'h1'} sx={{ mb: 2 }}>Orden: {orden._id}
      </Typography>

      {
        orden.pagada ? (
          <Chip
            sx={{ my: 2 }}
            label="Orden pagada"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
          />
        ):(
          <Chip
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined />}
          />
        )
      }


      <Grid container className="fadeIn">
        <Grid item xs={12} sm={6} md={7} >
          {/*Listado de los productos */}
          <ListaCarrito productos={ itemOrden }/>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          {/*Ordenes */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({numeroDeItems} { numeroDeItems > 1 ? 'productos': 'producto' })</Typography>
              <Divider sx={{ my: 1 }} />

             

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography >{ direccionCompra.nombre } { direccionCompra.apellido }</Typography>
              <Typography >{ direccionCompra.direccion }</Typography>
              <Typography >{ direccionCompra.ciudad }, { direccionCompra.codigo }</Typography>
              <Typography >{ direccionCompra.pais }</Typography>
              <Typography >{ direccionCompra.telefono }</Typography>

              <Divider sx={{ my: 1 }} />
              {/*Total de los productos */}
              
              <ResumenOrden 
                ordenCantidad={ orden.numeroDeItems }
                ordneSubtotal={orden.subTotal}
                ordenImpuesto={ orden.impuesto }
                ordenTotal={ orden.total }
              />

              <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                {
                  orden.pagada ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Orden pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ):(
                    <h1>Pagar</h1>
                  )
                }
                
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TiendaLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ req, query }) => {
  const { id = '' } = query ; 

  const sesion = await getSession({ req });

  if( !sesion ){
    return {
      redirect:{
        destination: `auth/login?p=/ordenes/${ id }`,
        permanent: false
      }
    }
  }

  const orden = await dbOrdenes.obtenerOrdenPorId( id.toString() );

  if( !orden ) {
    return {
      redirect:{
        destination: `ordenes/historial`,
        permanent: false
      }
    }
  }

  if( orden.usuario !== sesion.user._id ){
    return {
      redirect:{
        destination: `ordenes/historial`,
        permanent: false
      }
    }
  }

  return {
    props: {
      sesion,
      orden
    }
  }
}

export default PaginaOrden