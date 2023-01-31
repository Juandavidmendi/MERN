const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerdurasSchema = new Schema({
    verduraId:{type: String, required: true, max: 60},
    nombre:{type: String, required: true, max: 60},
    descripcion:{type: String, required: true, max: 40},
    precio:{type: Number, required: true},//este es el limite numero hasta 400
    cantidad:{type: Number, required: true}
});

module.exports = mongoose.model("verduras", VerdurasSchema);
//esquema de la tabla en la base de datos