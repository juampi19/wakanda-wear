import NextLink from 'next/link'
import { DataInicial } from "@/database/productos";
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { Contador } from '../ui';

const productosCarrito = [
  DataInicial.productos[0],
  DataInicial.productos[1],
  DataInicial.productos[2],
]

export const ListaCarrito = ({ editable }) => {
  return (
    <>
      {
        productosCarrito.map(producto => (
          <Grid container spacing={2} key={producto.slug} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              {/*Llevar a la pagina del producto */}
              <NextLink href={'/productos/slug'} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/productos/${producto.imagenes[0]}`}
                      component={'img'}
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant='body1'>{producto.titulo}</Typography>
                <Typography variant='body2'>Talla: <strong>{producto.tallas[2]}</strong></Typography>

                {/*condicional */}
                {
                  editable
                    ? <Contador />
                    : <Typography variant='h5'>4 items</Typography>
                }

              </Box>
            </Grid>

            <Grid item xs={0} mb={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <Typography variant='subtitle1'>{`$${producto.precio}`}</Typography>
              {/*Eliminar producto */}

              {
                editable && (
                  <Button variant='text' color='secondary'>
                    Remover
                  </Button>
                )
              }

            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
