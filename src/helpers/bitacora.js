import Aprendiz from '../models/aprendices.js';
import Bitacora from '../models/bitacora.js';

export const bitacoraHelper = {
    existeBitacoraID: async (id) => {
        const existeBitacora = await Bitacora.findById(id);
        if (!existeBitacora) {
            throw new Error(`Registro no existe: ${id}`);
        }
    },
    existeAprendiz: async(Aprendiz)=>{
        const existeAprendiz = await Bitacora.findOne({Aprendiz: 
            Aprendiz.nombre});
            if (!existeAprendiz){
                throw new Error(`Aprendiz no existe: ${Aprendiz.nombre}`);
            }
    },
    existeFicha: async (fichaid)=>{
        const existeFicha = await Bitacora.findOne({'Aprendiz.ficha': fichaid})
        .populate({
            path: 'Aprendiz',
            populate:{
                path: 'ficha',
                match: { _id: fichaid}
            }
        });

        if (!existeFicha || !existeFicha.Aprendiz){
            throw new Error(`La ficha con ID ${fichaid} no existe`);
        }
    }
};

export default bitacoraHelper;
