
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import {TiendaLayout} from '../components/layouts';
import { ListaProductos } from '@/components/productos';
import { useProducts } from '@/hooks';
import { PaginaCargando } from '@/components/ui';
import { Destacados } from '@/components/destacados/Destacados';




export default function Home() {



  const { productos, isLoading, isError } = useProducts('/productos');
  
  

  return (
    <TiendaLayout titulo={'Wakanda-Wear - Home'} descripcionPagina={'Encuentra los mejores productos de tus peliculas favoritas'} banner={true}>


      

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
