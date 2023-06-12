import { Producto } from "@/models";
import { db } from "."



export const obtenerProductoPorSlug = async( slug ) => {
  
  await db.connect();

  const producto = await Producto.findOne({ slug }).lean();

  await db.disconnect();

  if( !Producto ) {
    return null;
  }

  producto.imagenes = producto.imagenes.map( imagen => {
    return imagen.includes('http') ? imagen : `${ process.env.HOST_NAME }productos/${ imagen }`
  } );
  
  return JSON.parse( JSON.stringify( producto ) );
}



export const obtenerProductoSlugs = async() => {
  
  await db.connect();
  const slugs = await Producto.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
}


export const obtenerProductoPorTermino = async( termino ) => {

  termino = termino.toString().toLowerCase();

  await db.connect();

  const productos = await Producto.find({
    $text: { $search: termino }
  })
  .select(
    'titulo imagenes precio slug inStock -_id'
  )
  .lean();
  
  await db.disconnect();

  const productosActualizados = productos.map( producto => {
    producto.imagenes = producto.imagenes.map( imagen => {
      return imagen.includes('http') ? imagen : `${ process.env.HOST_NAME }productos/${ imagen }`
    } );

    return producto;
  } )

  return productosActualizados;
}


export const obtenerTodosProductos = async() => {
  
  await db.connect();

  const productos = await Producto.find().lean()

  await db.disconnect();

 
  const productosActualizados = productos.map( producto => {
    producto.imagenes = producto.imagenes.map( imagen => {
      return imagen.includes('http') ? imagen : `${ process.env.HOST_NAME }productos/${ imagen }`
    } );

    return producto;
  } )

  return JSON.parse( JSON.stringify( productosActualizados ) );
}