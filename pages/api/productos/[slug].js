import { db } from "@/database";
import { Producto } from "@/models";

export default function handler(req, res) {

  switch( req.method ) {
    case 'GET':
      return obtenerProductoPorSlug( req, res );

    default:
      return res.status(400).json({
        mensaje: 'Endpoint no existe'
      });  
  }

}

export const obtenerProductoPorSlug = async( req, res ) => {

  await db.connect();

  const { slug } = req.query;

  const producto = await Producto.findOne( { slug } ).lean();

  await db.disconnect();

  if( !producto ) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }

  return res.json( producto );

}