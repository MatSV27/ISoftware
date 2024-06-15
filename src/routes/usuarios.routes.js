const { Router } = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const {
    mostrarListaUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuario,
    autenticarUsuario
} = require("../controllers/usuarios.controller");

const router = Router();
router.use(bodyParser.json());

router.get("/mostrar-lista-usuarios", mostrarListaUsuarios);
router.get("/obtener-usuario/:id", obtenerUsuario);
router.delete("/eliminar-usuario/:id", eliminarUsuario);
router.put("/actualizar-usuario/:id", actualizarUsuario);
router.post("/login",autenticarUsuario);

module.exports = router;
