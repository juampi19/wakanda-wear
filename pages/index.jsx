import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import {TiendaLayout} from '../components/layouts'
import { DataInicial } from '@/database/productos'
import { ListaProductos } from '@/components/productos'





export default function Home() {
  return (
    <TiendaLayout titulo={'Wakanda-Wear'} descripcionPagina={'Encuentra los mejores productos de tus peliculas favoritas'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ my: 1 }}>Todos los productos</Typography>



      <ListaProductos 
        productos={DataInicial.productos}
      />

    </TiendaLayout>
  )
}
