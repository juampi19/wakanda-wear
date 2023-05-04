import { useState } from "react";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { TiendaLayout } from "@/components/layouts";
import { SelectorTalla, SlideShowProductos } from "@/components/productos";
import { Contador } from "@/components/ui";

import { dbProducto } from "@/database";




const PaginaProducto = ({ producto }) => {

  const [productoCarrito, setProductoCarrito] = useState({
    _id: producto._id,
    imagen: producto.imagenes[0],
    precio: producto.precio,
    talla: undefined,
    slug: producto.slug,
    titulo: producto.titulo,
    genero: producto.genero,
    cantidad: 1,
  });


  const onTallaSeleccionada = ( talla ) => {
    console.log( 'En padre', talla  );
  }

  
  

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
                tallaSeleccionada={ productoCarrito.talla }
                onTallaSeleccionada={onTallaSeleccionada}
              />
            </Box>

            {/*Agregar al carrito */}
            {
              (producto.inStock > 0)
              ? (
                <Button color="secondary" className="circular-btn" >
                  {
                    productoCarrito.talla
                    ? 'Agregar al carrito'
                    : 'Seleccione una Tall'
                  }
                </Button>
              ):(
                <Chip label="No hay disponibles" color="error" variant="outlined"/>
              )
            }



            

            

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