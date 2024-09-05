import Bitacora from '../models/bitacora.js';
import Aprendices from '../models/aprendices.js';

export const httpBitacora = {
    crearBitacora: async (req, res) => {
        try {
            const { Aprendiz } = req.body;

            // Verificar si se ha proporcionado el Aprendiz
            if (!Aprendiz) {
                return res.status(400).json({ msg: 'El aprendiz es obligatorio' });
            }

            // Buscar el aprendiz por CC
            const aprendizExistente = await Aprendices.findOne({ cc: Aprendiz });

            // Si no se encuentra el aprendiz, devolver un error
            if (!aprendizExistente) {
                return res.status(404).json({ msg: 'Aprendiz no encontrado' });
            }

            // Crear la bitácora con el ID del aprendiz encontrado
            const newBitacora = new Bitacora({
                Aprendiz: aprendizExistente._id,
            });

            const bitacoraSaved = await newBitacora.save();
            res.status(201).json(bitacoraSaved);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al crear la bitácora' });
        }
    },
    actualizarEstadoBitacora: async (req, res) => {
        try {
            const { id } = req.params; // ID de la bitácora
            const { estado } = req.body; // Nuevo estado

            // Verificar que el estado es válido
            const estadosValidos = ['pendiente', 'aceptado', 'rechazado', 'con excusa'];
            if (!estadosValidos.includes(estado)) {
                return res.status(400).json({ message: 'Estado inválido' });
            }

            const bitacora = await Bitacora.findByIdAndUpdate(
                id,
                { estado },
                { new: true } // Para devolver el documento actualizado
            );

            if (!bitacora) {
                return res.status(404).json({ message: 'Bitácora no encontrada' });
            }

            res.status(200).json(bitacora);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el estado', error });
        }
    },
    listarBitacoras: async (req, res) => {
        try {
            // Filtrar bitácoras donde Aprendiz no sea null y hacer populate de Aprendiz
            const bitacoras = await Bitacora.find({ Aprendiz: { $ne: null } }).populate('Aprendiz');
            res.json(bitacoras);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al listar las bitácoras', error });
        }
    },


    listarBitacorasPorFecha: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find({ fecha: { $gte: req.params.fechaInicio, $lte: req.params.fechaFin } });
            res.status(200).json(bitacoras);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarBitacorasPorAprendiz: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find({ aprendiz: req.params.aprendiz });
            res.status(200).json(bitacoras);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarBitacorasAprendizPorFecha: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find({ aprendiz: req.params.aprendiz, fecha: { $gte: req.params.fechaInicio, $lte: req.params.fechaFin } });
            res.status(200).json(bitacoras);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarBitacorasPorFicha: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find({ aprendiz: req.params.aprendiz }).populate('Aprendiz', 'Ficha');
            res.status(200).json(bitacoras);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarBitacorasPorFichaFecha: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find({ aprendiz: req.params.aprendiz, fecha: { $gte: req.params.fechaInicio, $lte: req.params.fechaFin } }).populate('Aprendiz', 'Ficha');
            res.status(200).json(bitacoras);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    aceptarBitacora: async (req, res) => {
        try {
            const bitacora = await Bitacora.findById(req.params.id);
            if (bitacora.estado === 'pendiente' || bitacora.estado === 'rechazado' || bitacora.estado === 'con excusa') {
                bitacora.estado = 'aceptado';
                await bitacora.save();
                res.status(200).json({ message: 'Bitacora aceptada' });
            } else {
                res.status(400).json({ message: 'Bitacora ya fue aceptada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    rechazarBitacora: async (req, res) => {
        try {
            const bitacora = await Bitacora.findById(req.params.id);
            if (bitacora.estado === 'pendiente' || bitacora.estado === 'aceptado' || bitacora.estado === 'con excusa') {
                bitacora.estado = 'rechazado';
                await bitacora.save();
                res.status(200).json({ message: 'Bitacora rechazada' });
            } else {
                res.status(400).json({ message: 'Bitacora ya fue aceptada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    excusarBitacora: async (req, res) => {
        try {
            const bitacora = await Bitacora.findById(req.params.id);
            if (bitacora.estado === 'pendiente' || bitacora.estado === 'aceptado' || bitacora.estado === 'rechazado') {
                bitacora.estado = 'con excusa';
                await bitacora.save();
                res.status(200).json({ message: 'Bitacora excusada' });
            } else {
                res.status(400).json({ message: 'Bitacora ya fue aceptada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default httpBitacora;
