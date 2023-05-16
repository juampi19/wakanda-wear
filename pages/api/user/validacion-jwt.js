import { db } from "@/database";
import { Usuario } from "@/models";
import { jwt } from "@/utils";
import bcrypt from 'bcryptjs';


export default function handler(req, res) {
  
  switch( req.method ){
    case 'GET':
      return validarJWT( req, res )

    default:
      res.status(400).json({
        message: 'End point no existe'
      })  
  }

}


const validarJWT = async( req, res ) => {

  const { token = '' } = req.cookies;

  let idUsuario = '';

  try {
    idUsuario = await jwt.tokenValido( token );
  } catch (error) {
    return res.status(401).json({
      message: 'El token de validación no es válido'
    })
  }
 

  await db.connect();
  const usuario = await Usuario.findById( idUsuario ).lean();
  await db.disconnect();


  //Comprobamos que el usuario exista
  if( !usuario ){
    return res.status(400).json({ message: 'No existe el usuario con ese id ' })
  }

 

  const { rol, nombre, _id, email } = usuario;



  return res.status(200).json({
    token: jwt.firmaToken( _id, email ), //jwt
    usuario: {
      email,
      rol,
      nombre
    }
  });

}