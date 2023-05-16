import { jwt, validacion } from "@/utils"
import { db } from "@/database";
import { Usuario } from "@/models";
import bcrypt from 'bcryptjs';


export default function handler(req, res) {
  switch( req.method ){
    case 'POST':
      return crearUsuario( req, res )

    default:
      res.status(400).json({
        message: 'End point no existe'
      })  
  }
}


const crearUsuario = async( req, res ) => {
  const { email = '', password = '', nombre = '' } = req.body;

  //Largo del password
  if( password.length < 6 ){
    return res.status(400).json({
      message: 'La contraseña debe ser de 6 caracteres'
    });
  }

  //Largo del nombre
  if( nombre.length < 2 ){
    return res.status(400).json({
      message: 'El nombre debe ser de 2 caracteres'
    });
  }

  //email valido
  if( !validacion.isValidEmail( email ) ){
    return res.status(400).json({
      message: 'El correo no es valido'
    });
  }


  await db.connect();
  const usuario = await Usuario.findOne({ email });

  //Comprobamos si ya existe
  if( usuario ){
    await db.disconnect();
    return res.status(400).json({ message: 'El usuario ya existe - Usuario' })
  }
 
  //Creamos el usuario
  const nuevoUsuario = new Usuario({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync( password ),
    rol: 'cliente',
    nombre
  });


  try {

    await nuevoUsuario.save({ validateBeforeSave: true })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Revisar servidor'
    })
  }

  const { _id } = nuevoUsuario;

  const token = jwt.firmaToken( _id, email );

  return res.status(200).json({
    token,
    usuario: {
      email,
      rol: 'cliente',
      nombre
    }
  })

}