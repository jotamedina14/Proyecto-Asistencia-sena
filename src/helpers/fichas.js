import Fichas from '../models/fichas.js';

export const fichaHelper = {
    existeFichaID: async (id, req) => {
        const ficha = await Fichas.findById(id);
        if (!ficha) {
            throw new Error(`Ficha no encontrada: ${id}`);
        }
        req.req.fichabd = ficha;
    }

};

export default fichaHelper;
