import mongoose, { Schema, model, Model } from 'mongoose';

const ordenSchema = new Schema({
  usuario : { type: Schema.Types.ObjectId, ref: 'Usuario', required: true  },
  itemOrden: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    titulo: { type: String, required: true },
    talla: { type: String, required: true },
    cantidad: { type: Number, required: true },
    slug: { type: String, required: true },
    imagen: { type: String, required: true },
    genero: { type: String, required: true },
    precio: { type: Number, required: true },

  }],
  direccionCompra: {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    direccion2: { type: String },
    codigo: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  numeroDeItems: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  impuesto: { type: Number, required: true },
  total: { type: Number, required: true },
  pagado: { type: Boolean, required: true, default: false },
  fechaPago: { type: String },
  
},{
  timestamps: true
})


const Orden = mongoose.models.Orden || model( 'Orden', ordenSchema );

export default Orden;