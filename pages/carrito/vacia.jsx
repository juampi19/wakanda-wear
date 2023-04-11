import NextLink from 'next/link'

import { TiendaLayout } from "@/components/layouts"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"


const PaginaVacia = () => {
  return (
    <TiendaLayout titulo={'Carrito vacío'} descripcionPagina={'No hay artículos en el carrito de compras'}>
      <Box 
        display={'flex'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 200px)'}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography>Su carrito está vacío</Typography>
          <NextLink href={'/'} passHref legacyBehavior>
            <Link typography={'h4'} color={'secondary'}>
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </TiendaLayout>
  )
}

export default PaginaVacia