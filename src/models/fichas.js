import mongoose from 'mongoose';

const fichaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    codigo: { type: String, required: true, unique: true, minlength: 7, maxlength: 10 },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true });

const Fichas = mongoose.model('Ficha', fichaSchema);

export default Fichas ;

