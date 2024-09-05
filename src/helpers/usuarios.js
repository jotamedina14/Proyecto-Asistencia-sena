import { generarJWT } from '../middlewares/validarJWT.js'; 
import Usuario from '../models/usuarios.js';
import bcryptjs from 'bcryptjs';

export const usuarioHelper = {
    // Verificar si existe un usuario por ID
    existeUsuarioID: async (id, req) => {
        const existe = await Usuario.findById(id);
        if (!existe) {
            throw new Error(`Registro no existe: ${id}`);
        }
        req.req.usuariobd = existe;
    },

    // Verificar si existe un email en la base de datos
    existeEmail: async (email, req) => {
        if (email) {
            const existe = await Usuario.findOne({ email });
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.email !== req.req.usuariobd.email) {
                        throw new Error(`Ya existe este ${email} email en la base de datos!!! `);
                    }
                } 
            }
        }
    },

    // Verificar si el email está registrado
    verificarEmail: async (email, req) => {
        const existe = await Usuario.findOne({ email });
        if (!existe) {
            throw new Error(`El email no está registrado`);
        }
        req.req.usuariobd = existe;
    }

    
};
export default  usuarioHelper ;
