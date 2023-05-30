import { db } from "@/database";
import { Orden, Producto, Usuario } from "@/models";

export default function handler(req, res) {
    
    switch( req.method ){
        case 'GET':
            return obtenerInformacion( req, res );

        default:
            return res.status(400).json({ name: 'bad request' })    
    }



}



const obtenerInformacion = async( req, res ) => {
    
    await db.connect();

    //Ordenes
    const numeroDeOrdenes = await Orden.find().count();
    const ordenesPagadas = await Orden.find({ pagado: true }).count();
    const ordenesPendientes = await Orden.find({ pagado: false }).count();

    //Clientes
    const totalClientes = await Usuario.find({ rol: 'cliente' }).count();


    //Productos
    const totalProductos = await Producto.find().count();

    const sinStock = await Producto.find({ inStock: 0 }).count();

    const bajoInventario = await Producto.find( { inStock: { $lt: 10 } } ).count();


    await db.disconnect();

    res.status(200).json({
        numeroDeOrdenes,
        ordenesPagadas,
        ordenesPendientes,
        totalClientes,
        totalProductos,
        sinStock,
        bajoInventario
        
    })
}