import { DataSemilla, db } from "@/database";
import { Producto } from "@/models";

export default async function handler (req, res) {

  if( process.env.NODE_ENV === 'production' ) {
    return res.status(401).json({ mensaje: 'No tienes acceso a este API' });
  }

  await db.connect();
  await Producto.deleteMany();
  await Producto.insertMany( DataSemilla.DataInicial.productos );

  await db.disconnect();

  res.status(200).json({ mensaje: 'Todo correcto' })
}