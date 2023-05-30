import { TiendaLayout } from "@/components/layouts";
import { dbOrdenes } from "@/database";
import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import NextLink from 'next/link'




const formatPrice = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});


const columns = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'nombreCompleto', headerName: 'Nombre Completo', width: 300},
  {field: 'totalPagar', headerName: 'Total a pagar', width: 200},
  {
    field: 'pagado', 
    headerName: 'Pagada',
    description: 'Muestra la información si esta pagada',
    width: 200,
    renderCell: ( params ) => {
      return (
        params.row.pagada
          ? <Chip color="success" label="Pagada" variant="outlined"/>
          : <Chip color="error" label="No Pagada" variant="outlined"/>
      )
    }
  },

  {
    field: 'orden',
    headerName: 'Ver orden',
    with: 200,
    sortable: false,
    renderCell: ( params ) => {
      return (
        <NextLink href={`/ordenes/${params.row.idOrden}`} passHref legacyBehavior>
          <Link underline="always">
            Ver orden
          </Link>
        </NextLink>
      )
    }
  }

];







const PaginaHistorial = ({ ordenes }) => {

  const rows = ordenes.map( (orden, index) => ({
    id: index + 1,
    pagada: orden.pagado,
    nombreCompleto: `${orden.direccionCompra.nombre} ${orden.direccionCompra.apellido}`,
    idOrden: orden._id,
    totalPagar: formatPrice.format( orden.total )
  }) )

  return (
    <TiendaLayout titulo={'Historial de ordenes'} descripcionPagina={'Historial de ordenes del cliente'}>

      <Typography variant="h1" component={'h1'}>Historial de ordenes</Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>

          <DataGrid 
            rows={ rows }
            columns={ columns }
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
          />

        </Grid>
      </Grid>

    </TiendaLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ req }) => {
  
  const sesion = await getSession({ req });

  if( !sesion ){
    return {
      redirect:{
        destination: `/auth/login?p=/ordenes/historial`,
        permanent: false
      }
    }
  }

  const ordenes = await dbOrdenes.ordenesPorUsuario( sesion.user._id )

  return {
    props: {
      ordenes
    }
  }
}


export default PaginaHistorial