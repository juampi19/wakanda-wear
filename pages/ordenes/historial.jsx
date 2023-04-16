import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NextLink from 'next/link'

const { TiendaLayout } = require("@/components/layouts");


const columns = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'nombreCompleto', headerName: 'Nombre Completo', width: 300},

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
        <NextLink href={`/ordenes/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">
            Ver orden
          </Link>
        </NextLink>
      )
    }
  }

];

const rows = [
  { id: 1, pagada: true, nombreCompleto: 'Prueba cliente'  },
  { id: 2, pagada: false, nombreCompleto: 'Prueba cliente2'  },
  { id: 3, pagada: true, nombreCompleto: 'Prueba cliente3'  },
  { id: 4, pagada: false, nombreCompleto: 'Prueba cliente4'  },
  { id: 5, pagada: true, nombreCompleto: 'Prueba cliente5', },
]


const PaginaHistorial = () => {
  return (
    <TiendaLayout titulo={'Historial de ordenes'} descripcionPagina={'Historial de ordenes del cliente'}>

      <Typography variant="h1" component={'h1'}>Historial de ordenes</Typography>

      <Grid container>
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

export default PaginaHistorial