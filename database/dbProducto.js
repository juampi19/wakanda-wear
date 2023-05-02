import { Producto } from "@/models";
import { db } from "."



export const obtenerProductoPorSlug = async( slug ) => {
  
  await db.connect();

  const producto = await Producto.findOne({ slug }).lean();

  await db.disconnect();

  if( !Producto ) {
    return null;
  }
  
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

  return productos;
}


export const obtenerTodosProductos = async() => {
  
  await db.connect();

  const productos = await Producto.find().lean()

  await db.disconnect();

  return JSON.parse( JSON.stringify( productos ) );
}