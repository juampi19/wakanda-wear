import jwt from 'jsonwebtoken';


export const firmaToken = ( _id, email ) => {

  if( !process.env.JWT_SECRET_SEED ){
    throw new Error( 'No existe semilla JWT' );
  }


  return jwt.sign( 
    //Payload
    {
      _id,
      email
    },
    //Semilla
    process.env.JWT_SECRET_SEED,

    //Opciones
    { expiresIn: '30d' }
  )

}

export const tokenValido = ( token ) => {

  if( !process.env.JWT_SECRET_SEED ){
    throw new Error( 'No existe semilla JWT' );
  }


  return new Promise( ( resolve, reject ) => {

    try {
      jwt.verify( token, process.env.JWT_SECRET_SEED, ( err, payload ) => {
        if( err ) return reject('JWT no es valido');


        const { _id } = payload;

        resolve(_id);


      }  )
    } catch (error) {
      reject('JWT no es valido')
    }

  } )
}