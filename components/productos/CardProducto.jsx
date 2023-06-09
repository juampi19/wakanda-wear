import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import NextLink from 'next/link'

export const CardProducto = ({ producto }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImagenCargada, setIsImagenCargada] = useState(false);

  const imagenProducto = useMemo(() => {
    return isHovered ? producto.imagenes[1]: producto.imagenes[0];

  }, [isHovered, producto.imagenes]);

  const formatPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/productos/${producto.slug}`} passHref legacyBehavior prefetch={false}>
          <Link>
            <CardActionArea>
              
            {

              (producto.inStock === 0) && (
                  <Chip 
                  color='primary'
                  label="No hay disponibles"
                  sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                />
              )

            }


              <CardMedia
                component='img'
                className='fadeIn'
                image={imagenProducto}
                alt={producto.titulo}
                onLoad={ () => setIsImagenCargada( true ) }
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImagenCargada ? 'block' : 'none' }} className="fadeIn">
        <Typography fontWeight={700} >{producto.titulo}</Typography>
        <Typography fontWeight={500}>{formatPrice.format( producto.precio )}</Typography>
      </Box>
    </Grid>
  )
}
