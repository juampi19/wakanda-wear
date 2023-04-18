import mongoose from 'mongoose';

/**
 * 0 = desconectado
 * 1 = conectado
 * 2 = conectando
 * 3 = desconectado
 */

const mongoConnection = {
  isConnected : 0
}

export const connect = async() => {

  if( mongoConnection.isConnected ){
    console.log( 'Ya esta conectado' );
    return;
  }

  if( mongoose.connections.length > 0 ) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if( mongoConnection.isConnected === 1 ) {
      console.log( 'Usando conexion anterior' );
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect( process.env.MONGO_URL || '' );
  mongoConnection.isConnected = 1;

  console.log( 'conectando a mongoDB', process.env.MONGO_URL );

}

export const disconnect = async() => {
    
  if ( process.env.NODE_ENV === 'development' ) return;

  if ( mongoConnection.isConnected === 0 ) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log('Desconectado de MongoDB');
}