import { db } from "@/database"
import { Orden, Producto } from "@/models"

import { getServerSession } from "next-auth"
// import { getSession } from "next-auth/react"

export default function handler(req, res) {

    switch( req.method ){
        case 'POST':
           return crearOrden( req, res )

        default:
            return res.status(400).json({ name: 'bad request' })
    }

}


const crearOrden = async ( req, res ) => {
    const { itemOrden, total, usuario } = req.body

    //Verificar la sesion del usuario
    const sesion = await  getServerSession(req, res);

    if( !sesion ) {
        return res.status(401).json({ message: 'Debe estar autenticado para realizar esta acción' });
    }

    //Crear un arreglo con los productos que la persona quiere
    const productosId = itemOrden.map( producto => producto._id );
    await db.connect();

    const dbProductos = await Producto.find({ _id: { $in: productosId } });


    try {
        //Comprobamos que los precios del front sean iguales a los del back
        const subtotal = itemOrden.reduce( ( total, producto ) => {

            const precioActual = dbProductos.find( prod => prod.id === producto._id ).precio;

            if( !precioActual ) {
                throw new Error( 'Verificar el carrito denuevo, producto no encontrado' );
            }


            return ( precioActual * producto.cantidad) + total;
          } , 0);

          const porcentajeImpuesto = Number( process.env.NEXT_PUBLIC_IMPUESTO || 0 );
          const backTotal = subtotal * ( porcentajeImpuesto + 1) ;


          if( total !== backTotal ){
            throw new Error( 'Total no cuadra con el  monto' )
          }

          //Todo bien, orden permitida
          const usuarioId = usuario._id;
          const nuevaOrden = new Orden({ ...req.body, pagado: false, usuario: usuarioId });

          await nuevaOrden.save();
          await db.disconnect();
          return res.status(201).json( nuevaOrden );

        
    } catch (error) {
        await db.disconnect();
        console.log( error );

        res.status(400).json({
            message: error.message || 'Revisar servidor'
        })
    }

    return res.status(201).json( req.body );
}