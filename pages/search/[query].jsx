import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import {TiendaLayout} from '../../components/layouts';
import { ListaProductos } from '@/components/productos';

import { dbProducto } from '@/database';




export default function PaginaBusqueda({ productos, productosEncontrados, query }) {

  

  return (
    <TiendaLayout titulo={'Wakanda-Wear - Search'} descripcionPagina={'Encuentra los mejores productos de tus peliculas favoritas'}>
      <Typography variant='h1' component={'h1'}>Buscar Productos</Typography>
      {
        productosEncontrados
          ? <Typography variant='h2' sx={{ my: 1 }} textTransform={'capitalize'}>Término: { query }</Typography>
          : (
            <Box display={'flex'}>
              <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningun producto</Typography>
              <Typography variant='h2' sx={{ ml: 1 }} color={'secondary'} textTransform={'capitalize'}>{ query }</Typography>
            </Box>
          )
      }


         <ListaProductos 
            productos={productos}
          />
         

    </TiendaLayout>
  )
}



export const getServerSideProps = async({ params }) => {

  const { query = '' } = params;
  
  if( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }


  let productos = await dbProducto.obtenerProductoPorTermino( query );
  const productosEncontrados = productos.length > 0;

  //TODO: Retornar otros productos, si no encuentra nada
  if( !productosEncontrados ){
    productos = await dbProducto.obtenerTodosProductos();
    console.log(productos)
  }

  return {
    props: {
      productos,
      productosEncontrados,
      query
    }
  }
}
