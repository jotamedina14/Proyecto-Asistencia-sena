import Usuario from '../models/usuarios.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../middlewares/validarJWT.js';

const httpUsuarios = {
    // GET: Listar todos los usuarios
    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.json({ usuarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST: Insertar usuario
    insertarUsuario: async (req, res) => {
        const { nombre, email, password } = req.body;
        const usuario = new Usuario({ nombre, email, password });

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        res.json({ usuario });
    },

    // POST: Login de usuario
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Usuario.findOne({ email });
            if (!user || user.estado === 0) {
                return res.status(401).json({ msg: "Usuario / Password no son correctos" });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ msg: "Usuario / Password no son correctos" });
            }

            const token = await generarJWT(user._id);

            res.json({ usuario: user, token });

        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },

    // PUT: Modificar usuario
    modificarUsuario: async (req, res) => {
        const { nombre, email, password } = req.body;
        const updateFields = { nombre, email };
    
        // Solo incluir password si se proporciona
        if (password) {
            const salt = bcryptjs.genSaltSync();
            updateFields.password = bcryptjs.hashSync(password, salt);
        }
    
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    
        res.json({ usuario });
    },
    

    // PUT: Activar usuario
    activarUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await Usuario.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Usuario activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Desactivar usuario
    desactivarUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await Usuario.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Usuario desactivado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export { httpUsuarios };
