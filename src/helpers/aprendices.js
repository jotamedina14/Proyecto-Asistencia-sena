import Aprendiz from '../models/aprendices.js';

export const aprendizHelper = {
    existeAprendizID: async (id, req) => {
        try {
            const aprendiz = await Aprendiz.findById(id);
            if (!aprendiz) {
                throw new Error(`Aprendiz no encontrado con ID: ${id}`);
            }
            req.req.aprendizbd = aprendiz;
        } catch (error) {
            throw new Error(error.message);
        }
    },
     // Verificar si existe un email en la base de datos
     existeEmail: async (email, req) => {
        if (email) {
            const existe = await Aprendiz.findOne({ email });
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.email !== req.req.aprendizbd.email) {
                        throw new Error(`Ya existe ese email en la base de datos!!! ${email}`);
                    }
                } else {
                    throw new Error(`Ya existe ese email en la base de datos!!! ${email}`);
                }
            }
        }
    },

    noExisteDocumento: async (cc) => {
       const existeAprendiz = await Aprendiz.findOne({ cc });
       if (!existeAprendiz) {
           throw new Error(`El documento ${cc} no está registrado)`);
       }
    },

    // Verificar si el email está registrado
    verificarEmail: async (email, req) => {
        const existe = await Aprendiz.findOne({ email });
        if (!existe) {
            throw new Error(`El email no está registrado`);
        }
        req.req.aprendizbd = existe;
    }
};
    

export default aprendizHelper;
