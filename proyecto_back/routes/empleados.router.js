const express = require("express");

// funcion de expres llamada router 
const router = express.Router();

//lamar al controladpr
const empleadosController = require("../controllers/empleados.controller");

//iniciar funcion crear cuando llege algo por post
router.post("/", empleadosController.create);
router.get("/", empleadosController.find);
router.get("/:id", empleadosController.findOne);
router.put("/:id", empleadosController.update);
router.delete("/:id", empleadosController.remove)

module.exports = router