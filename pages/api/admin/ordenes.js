import { db } from "@/database";
import { Orden } from "@/models";

export default function handler(req, res) {
  
  switch( req.method ) {
    case 'GET':
      return obtenerOrdenes( req, res );

    default:
      return res.status(400).json({ name: 'bad request' });   
  }


}


const obtenerOrdenes = async(req, res) => {

  await db.connect();

  const ordenes = await Orden.find()
                             .sort({ createdAt: 'desc' })
                             .populate('usuario', 'nombre email')
                             .lean();

  await db.disconnect();


  res.status(200).json( ordenes  );
}