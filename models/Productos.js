import mongoose,{ Schema, model, Model } from 'mongoose';
/*
* descripcion: string
* imagenes: string[]
* inStock: number
* precio: number
* tallas: []
* slug: string
* tags:[]
* titulo: []
* tipo: string
* genero: string
*/

const ProductoEsquema = new Schema({
  descripcion: { type: String, required: true },
  imagenes: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  precio: { type: Number, required: true, default: 0},
  tallas: [{ 
    type: String, 
    required: true,
    enum: {
      values: ['XS','S','M','L','XL','XXL','XXXL'],
      message: '{VALUE} no es un tamaño permitido'
    } 
  }],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String, required: true }],
  titulo: { type: String, required: true },
  tipo: { 
    type: String, 
    required: true,
    enum: {
      values: ['poleras', 'pantalones', 'polerones'],
      message: '{VALUE} no es un tipo permitido'
    }
  },
  genero: { type: String, required: true }
},{
  timestamps: true
});


//TODO: crear indice de mongo


const Producto = mongoose.models.Producto || model( 'Producto', ProductoEsquema );

export default Producto;
