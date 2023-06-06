import useSWR from "swr";
import { PaginaCargando } from "@/components/ui";

import { AdminLayout } from '@/components/layouts'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'



const columns = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'email', headerName: 'Correo', width: 200},
  {field: 'nombreCompleto', headerName: 'Nombre Completo', width: 250},
  {field: 'total', headerName: 'Total a pagar', width: 200},
  {
    field: 'pagado', 
    headerName: 'Pagada',
    description: 'Muestra la información si esta pagada',
    width: 150,
    renderCell: ( {row} ) => {
      return (
        row.pagada
          ? <Chip color="success" label="Pagada" variant="outlined"/>
          : <Chip color="error" label="No Pagada" variant="outlined"/>
      )
    }
  },
  {field: 'totalProductos', headerName: 'No.Productos', width: 150, align: 'center' },
  {
    field: 'orden',
    headerName: 'Ver orden',
    with: 200,
    sortable: false,
    renderCell: ( {row} ) => {
      return (
        <a href={`/admin/ordenes/${ row.idOrden }`} target='_blank' rel='noreferrer'>
          Ver orden
        </a>
      )
    }
  },
  {field: 'fecha', headerName: 'Creada en', width: 200  }

];

const PaginaOrdenes = () => {

  const { data, error } = useSWR( '/api/admin/ordenes' );
  console.log( data );

  if( !data && !error ) {
    return <PaginaCargando />
  }

  const rows = data?.map( ( orden, index ) => (
    {
    id: index +1,
    email: orden.usuario.email,
    nombreCompleto: `${orden.direccionCompra.nombre} ${orden.direccionCompra.apellido}`,
    total: orden.total,
    pagada: orden.pagado,
    totalProductos: orden.numeroDeItems,
    fecha: orden.createdAt,
    idOrden: orden._id

  }) )

  return (

    <AdminLayout
      titulo={'Ordenes'}
      subTitulo={'Mantenimiento de ordenes'}
      icono={<ConfirmationNumberOutlined />}
    >

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
          />

        </Grid>
      </Grid>

    </AdminLayout>


  )
}

export default PaginaOrdenes