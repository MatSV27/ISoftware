const pool  = require("../db");

const agregarUsuario = async (req,res) => {
    try{
            const {nombre,username,correo,documentoidentidad,contrasena,rol} = req.body
            
            const resultado = await pool.query(
                `INSERT INTO USUARIO (idusuario,nombre,username,correo,documentoidentidad,contrasena,rol,fechaingreso) VALUES ('7',$1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP) RETURNING idusuario`,
                [
                    nombre,username,correo,documentoidentidad,contrasena,rol
                ]
            );

    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'error al crear user' });
    }
}

const mostrarListaUsuarios = async (req,res) =>{
    try{
        const listaUsuarios = await pool.query(
            "SELECT U.IDUSUARIO, U.NOMBRE, U.ROL, U.USERNAME, U.CORREO " + 
            "FROM USUARIO U " +
            "ORDER BY U.IDUSUARIO"
        );
        
        const resultado = {
            listaUsuarios: listaUsuarios.rows,
        };
        return res.json(resultado);
    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query(
            "DELETE FROM USUARIO WHERE IDUSUARIO = $1",
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, contrasena, rol } = req.body;

        const resultado = await pool.query(
            "UPDATE USUARIO SET USERNAME = $1, CORREO = $2, CONTRASENA = $3, ROL = $4 WHERE IDUSUARIO = $5",
            [username, email, contrasena, rol, id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT * FROM USUARIO WHERE IDUSUARIO = $1", [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.json(resultado.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const autenticarUsuario = async (req, res) => {
    try {
        const { username, contrasena } = req.body;
        const resultado = await pool.query(
            "SELECT * FROM USUARIO WHERE USERNAME = $1 AND CONTRASENA = $2",
            [username, contrasena]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        return res.json({ message: 'Autenticación exitosa', usuario: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
};

module.exports = {
    mostrarListaUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuario,
    autenticarUsuario,
    agregarUsuario
}
