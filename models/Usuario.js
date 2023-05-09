import mongoose, { Schema, model, Model } from 'mongoose';

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: {
      values: ['admin', 'cliente', 'repartidor'],
      message: '{VALUE} no es un rol válido',
      default: 'cliente',
      required: true
    }
  }
},{
  timestamps: true
})


const Usuario = mongoose.models.Usuario || model( 'Usuario', usuarioSchema );

export default Usuario;