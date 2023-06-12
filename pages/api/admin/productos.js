import { db } from "@/database";
import { Producto } from "@/models";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config( process.env.CLOUDINARY_URL || '' );

export default function handler(req, res) {
  switch( req.method ){
    case 'GET':
      return obtenerProductos( req, res );

    case 'PUT':
      return actualizarProducto( req, res ); 
      
    case 'POST':
      return crearProducto( req, res );

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

  const productosActualizados = productos.map( producto => {
    producto.imagenes = producto.imagenes.map( imagen => {
      return imagen.includes('http') ? imagen : `${ process.env.HOST_NAME }productos/${ imagen }`
    } );

    return producto;
  } )



  res.status(200).json( productosActualizados );

}

const actualizarProducto = async( req, res ) => {
  const { _id = '' , imagenes = [] } = req.body;

  
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
      
      
      //TODO: eliminar la imagen en cloudinary
      //https://res.cloudinary.com/ds9gg46za/image/upload/v1686348623/mqcolqdoj00q9qekg0xu.jpg
      producto.imagenes.forEach( async( imagen ) => {
        if( !imagenes.includes( imagen ) ) {
          //Borrar de cloudinary
          const [ archivoId, extencion ] = imagen.substring( imagen.lastIndexOf('/') + 1 ).split('.'); 
          console.log({ archivoId, extencion, imagen })
          await cloudinary.uploader.destroy( archivoId );
        }
      } )

      await Producto.updateOne({ _id }, req.body, { new: true } );
    
      await db.disconnect(); 
      res.status(200).json( producto );
    
  } catch (error) {
    
    await db.disconnect();
    return res.status( 400 ).json({ message: 'Revisar el servidor' });
  }
  
  
}


const crearProducto = async ( req, res ) => {

  const { imagenes = [] } = req.body;

  if( imagenes.length < 2 ) {
    return res.status(400).json({ message: 'El producto debe tener mínimo 2 imágenes' }); 
  }

  try {
    
    await db.connect();


    const productoExistente = await Producto.findOne({ slug: req.body.slug });

    if( productoExistente ) {
      await db.disconnect()
      return res.status(400).json({ message: 'Ya existe un producto con ese slug' }); 
    }

    const producto = await new Producto( req.body );

    await producto.save();

    await db.disconnect();

    res.status(201).json( producto );

  } catch (error) {
    console.log( error )
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar el servidor' }); 
  }


}