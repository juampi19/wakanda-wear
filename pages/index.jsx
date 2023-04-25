import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import {TiendaLayout} from '../components/layouts';
import { ListaProductos } from '@/components/productos';
import { useProducts } from '@/hooks';
import { PaginaCargando } from '@/components/ui';






export default function Home() {

  

  const { productos, isLoading, isError } = useProducts('/productos');
  console.log( productos )

  return (
    <TiendaLayout titulo={'Wakanda-Wear'} descripcionPagina={'Encuentra los mejores productos de tus peliculas favoritas'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ my: 1 }}>Todos los productos</Typography>



      {
        isLoading
        ? <PaginaCargando />
        : <ListaProductos 
            productos={productos}
          />
        
        
      }

    </TiendaLayout>
  )
}
