const express = require("express");

// funcion de expres llamada router 
const router = express.Router();

//lamar al controladpr
const verdurasController = require("../controllers/verduras.controller");

//iniciar funcion crear cuando llege algo por post
router.post("/", verdurasController.crearVerdura);
router.get("/", verdurasController.buscarVerduras);
router.get("/:id", verdurasController.buscarVerdura);
router.put("/:id", verdurasController.actualizarVerdura);
router.delete("/:id", verdurasController.eliminarVerdura)

module.exports = router