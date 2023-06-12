import formidable from 'formidable';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config( process.env.CLOUDINARY_URL || '' );

export const config = {
  api: {
    bodyParser: false,
  }
}


export default function handler(req, res) {

  switch( req.method ) {
    case 'POST':
      return subirArchivos( req, res );

    default:
      res.status( 400 ).json({ message: 'Bad request' });  
  }

}

const guardarImagenes = async ( archivo ) => {
  // const data = fs.readFileSync( archivo.filepath );
  // fs.writeFileSync( `./public/${ archivo.originalFilename }`, data );
  // fs.unlinkSync( archivo.filepath );
  // return;

  const { secure_url } = await cloudinary.uploader.upload( archivo.filepath );
  return secure_url ;

}

const compilarArchivos = async ( req ) => {
  
  return new Promise( ( resolve, reject ) => {
    const form = new formidable.IncomingForm();

    form.parse( req, async( err, fields, files ) => {
     

      if( err ) {
        return reject( err );
      }

      const archivo = await guardarImagenes( files.file );
      resolve( archivo );

    } );
  } );

}

const subirArchivos = async( req, res ) => {



  const imagenUrl = await compilarArchivos( req );

  return res.status(200).json( { message: imagenUrl } );
}