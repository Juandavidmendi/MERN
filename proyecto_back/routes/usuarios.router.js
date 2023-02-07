const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

router.get("/:id", usuariosController.findOne);
router.get("/", usuariosController.find);
router.post("/login", usuariosController.login);
// router.get("/", usuariosController.buscarUsuarios);



module.exports = router