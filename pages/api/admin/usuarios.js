import { db } from "@/database";
import { Usuario } from "@/models";
import { isValidObjectId } from "mongoose";

export default function handler(req, res) {

    switch( req.method ) {
        case 'GET':
            return obtenerUsuarios( req, res );
        case 'PUT':
            return modificarUsuarios( req, res );
            
        default: 
            res.status(400).json({ name: 'bad request' });   
    }


}


const obtenerUsuarios = async( req, res ) => {

    await db.connect();

    const usuarios = await Usuario.find().select('-password').lean();

    await db.disconnect();

    res.status(200).json( usuarios );
}


const modificarUsuarios = async( req, res ) => {
    const { usuarioId = '', rol = '' } = req.body;

    if( !isValidObjectId( usuarioId ) ){
        return  res.status(400).json({ name: 'bad request' }); 
    }

    const rolesPermitidos = [ 'admin', 'super-user', 'SEO', 'cliente', 'repartidor' ];

    if( !rolesPermitidos.includes( rol ) ) {
        return  res.status(400).json({ name: 'rol no permitido' }); 
    }

    await db.connect();

    const usuario = await Usuario.findById( usuarioId );


    if( !usuario ){
        return  res.status(404).json({ name: 'Usuario no encontrado' });
    }

    usuario.rol = rol;
    await usuario.save();

    
    await db.disconnect();

    res.status(200).json({ message: 'Usuario actualizado'})
}