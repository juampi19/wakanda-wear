import { TiendaLayout } from "@/components/layouts";
import { SelectorTalla, SlideShowProductos } from "@/components/productos";
import { Contador } from "@/components/ui";
import { DataInicial } from "@/database/productos";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

const producto = DataInicial.productos[0];

const slug = () => {
  return (
    <TiendaLayout titulo={producto.titulo} descripcionPagina={producto.descripcion}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <SlideShowProductos imagenes={producto.imagenes}/>
        </Grid>

        <Grid item xs={12} sm={5} className="shadow">
          <Box display={'flex'} flexDirection={'column'} marginTop={'50px'}>

            {/**titulos */}
            <Typography variant="h1" component={'h1'}>{producto.titulo}</Typography>
            <Typography variant="subtitle1" component={'h2'}>{`$${producto.precio}`}</Typography>

            {/**cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              {/*componente para contador */}
              <Contador />
              <SelectorTalla 
                tallas={ producto.tallas }
                tallaSeleccionada={ producto.tallas[3] }
              />
            </Box>

            {/*Agregar al carrito */}
            <Button color="secondary" className="circular-btn" >
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant="outlined"/> */}

            {/*descripcion */}
            <Box sx={{mt:3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{producto.descripcion}</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>


    </TiendaLayout>
  )
}

export default slug