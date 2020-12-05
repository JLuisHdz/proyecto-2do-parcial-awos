const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema ({
    
    nombre: {
            type: String,
            unique: true,
            required: [true, 'La descripcion es obligatoria'] 
    },

    precioUni: {
            type: Number,
            required: [true, 'El precio es obligatorio'] 
},
    categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria'
},
   
    disponible: {   
            type: Boolean,
            default: true 
},
    usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
},

});

module.exports = mongoose.model('Producto', productoSchema);