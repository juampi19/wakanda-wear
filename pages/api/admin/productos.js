import { db } from "@/database";
import { Producto } from "@/models";
import { isValidObjectId } from "mongoose";

export default function handler(req, res) {
  switch( req.method ){
    case 'GET':
      return obtenerProductos( req, res );
    case 'PUT':
      return actualizarProducto( req, res );  
    default:
      return res.status(400).json({ message: 'bad request' })  
  }
}


const obtenerProductos = async ( req, res ) => {

  await db.connect();

  const productos = await Producto.find()
    .sort({ title: 'asc' })
    .lean()

  await db.disconnect();



  res.status(200).json( productos );

}

const actualizarProducto = async( req, res ) => {
  const { _id , imagenes } = req.body;

  
  if( !isValidObjectId( _id ) ) {
    return res.status( 400 ).json({ message: 'El id del producto no es valído' });
  }
  
  if( imagenes.length < 2 ) {
    return res.status( 400 ).json({ message: 'Es necesario el menos 2 imágenes' });
  }
  
 
  //TODO: cambiar el path de las imagenes cuando se suban a cloudinary

  try {
    await db.connect();

     const producto = await Producto.findById( _id );

     
     //Si el producto no existe 
     if( !producto ){
       await db.disconnect();
       return res.status( 400 ).json({ message: 'El producto no existe' });
      }
      
      console.log( producto )
      //TODO: eliminar la imagen en cloudinary

      await producto.update( req.body );
    
      await db.disconnect(); 
      return res.status(200).json( producto );
    
  } catch (error) {
    
    await db.disconnect();
    return res.status( 400 ).json({ message: 'Revisar el servidor' });
  }
  
  
}