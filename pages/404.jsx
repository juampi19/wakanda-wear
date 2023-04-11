import { TiendaLayout } from "@/components/layouts"
import { Box, Typography } from "@mui/material"


const Custom404 = () => {
  return (
    <TiendaLayout titulo={'Pagina no encontrada'} descripcionPagina={'No hay nada que mostrar aqui'}>
      <Box 
        display={'flex'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 200px)'}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >

        <Typography variant="h1" component={'h1'} fontSize={80} fontWeight={400}>404 |</Typography>
        <Typography marginLeft={2}>No encontramos ninguna página aquí</Typography>
      </Box>
    </TiendaLayout>
  )
}

export default Custom404