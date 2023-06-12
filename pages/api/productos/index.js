import { db, TIENDA_CONSTANTES } from "@/database";
import { Producto } from "@/models";


export default function handler (req, res) {

  switch( req.method ){
    case 'GET':
      return obtenerProductos( req, res );
      
    default:
      return res.status(400).json({
        mensaje: 'Bad request'
      });  
  }

}

const obtenerProductos = async( req, res ) => {

  const { genero = 'todos' } = req.query;

  let condicion = {}

  if( genero !== 'todos' && TIENDA_CONSTANTES.generosValidos.includes( genero ) ){
    condicion = { genero };
  }

  await db.connect();

  const productos = await Producto.find( condicion )
                                  .select( 'titulo genero imagenes precio inStock slug -_id' )
                                  .lean();

  await db.disconnect();

  const productosActualizados = productos.map( producto => {
    producto.imagenes = producto.imagenes.map( imagen => {
      return imagen.includes('http') ? imagen : `${ process.env.HOST_NAME }productos/${ imagen }`
    } );

    return producto;
  } )

  return res.status( 200 ).json( productosActualizados );
}