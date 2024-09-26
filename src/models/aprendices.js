import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AprendizSchema = Schema({
    idFicha: {
        type: Schema.Types.ObjectId,
        ref: 'Ficha',
        required: true
    },
    cc: {
        type: String,
        required: [true, 'La cédula es obligatoria']
    }, 
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        minlength: 7, maxlength: 10 
    },
    estado: {
        type: Number,
        default: 1
    },
});

const Aprendiz = model('Aprendiz', AprendizSchema);

export default Aprendiz;

