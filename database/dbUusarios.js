import bcrypt from 'bcryptjs'
import { Usuario } from "@/models";
import { db } from "./";



export const confirmarEmailPassword = async( email, password ) => {
    await db.connect();
    const usuario = await Usuario.findOne({ email });
    await db.disconnect();


    if( !usuario ) {
        return null;
    }


    if( !bcrypt.compareSync( password, usuario.password ) ) {
        return null;
    }

    const { rol, nombre, _id } = usuario;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        rol,
        nombre
    }

}

//Crea o verifica un usuario de OAuth
export const OAuthUsuario = async( oAuthEmail, oAuthName ) => {
    await db.connect();
    const usuario = await Usuario.findOne({ email: oAuthEmail });

    if( usuario ){
        await db.disconnect();
        const { _id, nombre, email, rol } = usuario;
        return { _id, nombre, email, rol }
    }

    //Creamos el usuario en la bd
    const nuevoUsuario = new Usuario({ email: oAuthEmail, nombre: oAuthName, password: '@', rol: 'cliente' });

    await nuevoUsuario.save();
    await db.disconnect();

    const { _id, nombre, email, rol } = nuevoUsuario;

    return { _id, nombre, email, rol }
}