import { db } from "@/database";
import { Orden } from "@/models";
import axios from "axios";

export default function handler(req, res) {

    switch( req.method ){
        case 'POST':
            return pagarOrden( req, res );
        default:
            return res.status(400).json({ message: 'Bad request' });    
    }



    res.status(200).json({ name: 'Example' })
}

const obtenerPaypalBearerToken = async () => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const body = new URLSearchParams('grant_type=client_credentials');
    const token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64')

    try {
        
        const {data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


        return data.access_token;

    } catch (error) {
        if( axios.isAxiosError( error ) ){
            console.log(error.response.data);
        }else {
          console.log( error )  
        }

        return null
    }

}

const pagarOrden = async ( req, res ) => {

    const bearerToken = await obtenerPaypalBearerToken();

    if( !bearerToken ) {
        
        res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }

    const { idTransaccion = '', ordenId = '' } = req.body

    const { data } = await axios.get( `${ process.env.PAYPAL_ORDERS_URL }/${ idTransaccion }`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    } );

    if( data.status !== 'COMPLETED' ) {
        res.status(401).json({ message: 'Orden no reconocida' });
    }

    await db.connect();
    const dbOrden = await Orden.findById( ordenId );

    if( !dbOrden ) {
        await db.disconnect();
        res.status(400).json({ message: 'La orden no existe en la base de datos' });
    }


    if( dbOrden.total !== Number(data.purchase_units[0].amount.value) ) {
        await db.disconnect();
        res.status(400).json({ message: 'Los montos de paypal y de la base de datos no son iguales' });
    }

   dbOrden.trasaccionId = idTransaccion;
   dbOrden.pagado = true;
   await dbOrden.save();

   await db.disconnect();

    res.status(200).json({ message: 'Orden pagada' })
}