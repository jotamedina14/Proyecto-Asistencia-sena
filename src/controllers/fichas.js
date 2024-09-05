import Fichas from '../models/fichas.js';

const httpFichas = {
    listarFichas: async (req, res) => {
        try {
            const fichas = await Fichas.find();
            res.json({ fichas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    insertarFichas: async (req, res) => {
        const { nombre, codigo, estado = 1 } = req.body; 
        try {
            const nuevaFicha = new Fichas({ nombre, codigo, estado });
            await nuevaFicha.save();
            res.status(201).json({ ficha: nuevaFicha }); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    modificarFichas: async (req, res) => {
        const { id } = req.params;
        const { nombre, codigo} = req.body;
        try{
            const fichas= await Fichas.findByIdAndUpdate(id, {nombre, codigo}, {new: true});

            if(!fichas){
                res.status(404).json({msg: "Ficha no encontrada"});
            }
            res.json({msg:"Ficha Modificada Correctamente"});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    },

    activarFichas: async (req, res) => {
        const { id } = req.params;
        try {
            const fichaActivada = await Fichas.findByIdAndUpdate(id, { estado: 1 });
            if (fichaActivada) {
                res.json({ msg: "Ficha activada correctamente" });
            } else {
                res.status(404).json({ msg: "Ficha no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    desactivarFichas: async (req, res) => {
        const { id } = req.params;
        try {
            const fichaDesactivada = await Fichas.findByIdAndUpdate(id, { estado: 0 });
            if (fichaDesactivada) {
                res.json({ msg: "Ficha desactivada correctamente" });
            } else {
                res.status(404).json({ msg: "Ficha no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export {httpFichas} ;
