const Verdura = require('../models/verduras.model');

//objeto con los mensajes de respuesta
let response = {
    msg: "",
    exito: false
}

exports.crearVerdura = function(req,res){
    //instancia al modelo empleado
    let verdura = new Verdura({
        verduraId: req.body.verduraId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad, 
    })
    //funcion guardar 
    verdura.save(function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al guardar el producto"
            res.json(response);
            return;
        }

        response.exito = true,
        response.msg = "El producto se guardo correctamente"
        res.json(response)
    })
}

exports.buscarVerduras = function(req,res){
    Verdura.find(function(err, verduras){
        res.json(verduras)
    })
}

exports.buscarVerdura = function(req,res){
    Verdura.findOne({_id: req.params.id},function(err, verdura){
        res.json(verdura)
    })
}
//funcion req and response
exports.actualizarVerdura = function(req,res){ 
    let verdura = ({
        verduraId: req.body.verduraId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad, 
    })
    Verdura.findByIdAndUpdate(req.params.id, {$set: verdura}, function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al modificar el producto"
            res.json(response)
            return;  
        }
        response.exito = true,
        response.msg = "El producto se modifico correctamente"
        res.json(response)
    })
}

exports.eliminarVerdura = function(req,res){
    Verdura.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al eliminar el producto"
            res.json(response)
            return;  
        }

        response.exito = true,
        response.msg = "El producto se ha eliminado correctamente"
        res.json(response)
    })
} 