import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import {TiendaLayout} from '../../components/layouts';
import { ListaProductos } from '@/components/productos';
import { useProducts } from '@/hooks';
import { PaginaCargando } from '@/components/ui';






export default function PaginaNiños() {

  

  const { productos, isLoading, isError } = useProducts('/productos?genero=niños');
  console.log( productos )

  return (
    <TiendaLayout titulo={'Wakanda-Wear - Niños'} descripcionPagina={'Encuentra los mejores productos de tus peliculas favoritas de niños'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ my: 1 }}>Todos los productos de niños</Typography>



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
