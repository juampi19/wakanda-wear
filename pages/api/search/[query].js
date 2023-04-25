import { db } from "@/database";
import { Producto } from "@/models";


export default function handler(req, res) {
  
  switch( req.method ) {
    case 'GET':
      return buscarProducto( req, res );

    default:
      return res.status(400).json({
        mensaje: 'Endpoint no existe'
      });  
  }


}


export const buscarProducto = async( req, res ) => {

  let { query = '' } = req.query;

  if( query.length === 0 ) {
    return res.status(400).json({
      mensaje: 'Debe de especificar el query de busqueda'
    });
  }



  query = query.toString().toLowerCase();

  await db.connect();

  const productos = await Producto.find({
    $text: { $search: query }
  })
  .select(
    'titulo imagenes precio slug inStock -_id'
  )
  .lean();

  await db.disconnect();
 
  return res.status(200).json(productos);
} 