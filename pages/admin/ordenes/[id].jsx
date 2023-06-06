import { ListaCarrito, ResumenOrden } from '@/components/carrito'
import { AdminLayout } from '@/components/layouts'
import { obtenerOrdenPorId } from '@/database/dbOrdenes'
import { CreditCardOffOutlined, CreditScoreOutlined, Inventory2Outlined } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material'



const PaginaOrden = ({ orden }) => {


  const { itemOrden, direccionCompra, numeroDeItems } = orden;

  return (
    
    <AdminLayout
      titulo={ 'Detalle de la Orden' }
      icono={<Inventory2Outlined />}
      subTitulo={`OrdenId: ${ orden._id }`}
    >

{
        orden.pagado ? (
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

      <Grid container className='fadeIn'>

        <Grid item xs={12} sm={6} md={7}>
          <ListaCarrito productos={ itemOrden }/>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Card className='summary-card'>
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

              <Box display={'flex'} flexDirection={'column'}>
                {
                  orden.pagado ? (
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

              </Box>

            </CardContent>
          </Card>

        </Grid>

      </Grid>
      
    </AdminLayout>

  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;

 
  const orden = await obtenerOrdenPorId( id.toString() );

  if( !orden ) {
    return {
      redirect: {
        destination: '/admin/ordenes',
        permanent: false
      }
    }
  }

  return {
    props: {
      orden
    }
  }
}

export default PaginaOrden