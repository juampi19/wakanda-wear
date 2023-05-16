import { db } from "@/database";
import { Usuario } from "@/models";
import { jwt } from "@/utils";
import bcrypt from 'bcryptjs';


export default function handler(req, res) {
  
  switch( req.method ){
    case 'POST':
      return loginUsuario( req, res )

    default:
      res.status(400).json({
        message: 'End point no existe'
      })  
  }

}


const loginUsuario = async( req, res ) => {

  const { email = '', password= '' } = req.body;

  await db.connect();
  const usuario = await Usuario.findOne({ email });
  await db.disconnect();


  //Comprobamos que el usuario exista
  if( !usuario ){
    return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
  }

  //Comprobamos la password
  if( !bcrypt.compareSync( password, usuario.password ) ) {
    return res.status(400).json({ message: 'Correo o contraseña no válidos - PASSWORD' })
  }


  const { rol, nombre, _id } = usuario;

  const token = jwt.firmaToken( _id, email )

  return res.status(200).json({
    token, //jwt
    usuario: {
      email,
      rol,
      nombre
    }
  });

}