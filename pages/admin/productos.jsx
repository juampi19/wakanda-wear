import useSWR from "swr";
import { PaginaCargando } from "@/components/ui";
import NextLink from 'next/link'

import { AdminLayout } from '@/components/layouts'
import { CategoryOutlined, ConfirmationNumberOutlined } from '@mui/icons-material'
import {  CardMedia, Grid, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'



const columns = [
  {
    field: 'img', 
    headerName: 'Foto',
    renderCell: ( { row } ) => {
      return (
        <a href={ `/productos/${ row.slug }` } target="_blank" rel="noreferrer">
          <CardMedia 
            component={'img'}
            className="fadeIn"
            image={`/productos/${ row.img }`}
          />
        </a>
      )
    },
    height: 400
  },
  {
    field: 'titulo', 
    headerName: 'Titulo',
    width: 250,
    renderCell: ({ row }) => {
      return (
        <NextLink href={`/admin/productos/${ row.slug }`} passHref legacyBehavior>
          <Link underline="always">
            { row.titulo }
          </Link>
        </NextLink>
      )
    }
  },
  {field: 'genero', headerName: 'Género'},
  {field: 'tipo', headerName: 'Tipo'},
  {field: 'inStock', headerName: 'Inventario'},
  {field: 'precio', headerName: 'Precio'},
  {field: 'tallas', headerName: 'Tallas', width: 250},
  
];

const PaginaOrdenes = () => {

  const { data, error } = useSWR( '/api/admin/productos' );


  if( !data && !error ) {
    return <PaginaCargando />
  }

  const rows = data?.map( producto => (
  {
    id: producto._id,
    img: producto.imagenes[0],
    titulo: producto.descripcion,
    genero: producto.genero,
    tipo: producto.tipo,
    inStock: producto.inStock,
    precio: producto.precio,
    tallas:  producto.tallas.join(', '),
    slug: producto.slug 

  }) )

  return (

    <AdminLayout
      titulo={`Productos ${ data?.length }`}
      subTitulo={'Mantenimiento de productos'}
      icono={<CategoryOutlined />}
    >

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 700, width: '100%' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
            getRowHeight={() => 100} getEstimatedRowHeight={() => 100}
          />

        </Grid>
      </Grid>

    </AdminLayout>


  )
}

export default PaginaOrdenes