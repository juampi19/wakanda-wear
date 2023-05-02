import { TiendaLayout } from "@/components/layouts";
import { SelectorTalla, SlideShowProductos } from "@/components/productos";
import { Contador } from "@/components/ui";
import { dbProducto } from "@/database";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";



const PaginaProducto = ({ producto }) => {

  /**Prueba 1 - Static */
  // const {query} = useRouter();
  // const {productos: producto, isLoading} = useProducts(`/productos/${query.slug}`);

  
  

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
                // tallaSeleccionada={ producto.tallas[3] }
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
/**Prueba 2 serverSideRendering */
// export const getServerSideProps = async( {params} ) => {
  
//   const { slug = '' } = params;
//   const producto = await dbProducto.obtenerProductoPorSlug( slug );


//   if( !producto ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }


//   return {
//     props: {
//       producto
//     }
//   }
// }


/**Prueba 3 */
//getStaticPaths
export const getStaticPaths = async() => {

  const productosSlug = await dbProducto.obtenerProductoSlugs();
  
  
  return {
    paths: productosSlug.map(
      ({ slug }) => ({
        params:{
          slug
        }
      })
    ),
    fallback: "blocking"
  }
}

//getStaticProps
//Revalidar cada 24 horas
export const getStaticProps = async({ params }) => {

  const { slug = '' } = params;

  const producto = await dbProducto.obtenerProductoPorSlug( slug );

  if( !producto ) {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

  return {
    props: {
      producto
    },
    revalidate : 60 * 60 * 24
  }
}


export default PaginaProducto