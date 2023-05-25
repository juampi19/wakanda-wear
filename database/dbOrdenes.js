import { isValidObjectId } from "mongoose"
import { db } from ".";
import { Orden } from "@/models";


export const obtenerOrdenPorId = async( id ) => {

    if( !isValidObjectId(id) ){
        return null;

    }

    await db.connect();

    const orden = await Orden.findById( id ).lean();

    await db.disconnect();

    if( !orden ){
        return null
    }

    return JSON.parse( JSON.stringify( orden ) );

}


export const ordenesPorUsuario = async ( usuarioId ) => {
    if( !isValidObjectId( usuarioId ) ){
        return []
    }

    await db.connect();
    const ordenes = await  Orden.find({ usuario: usuarioId }).lean()
    await db.disconnect();

    return JSON.parse( JSON.stringify( ordenes ) );
}