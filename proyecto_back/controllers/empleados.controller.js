const Empleado = require('../models/empleados.model');

//objeto con los mensajes de respuesta
let response = {
    msg: "",
    exito: false
}

exports.create = function(req,res){
    //instancia al modelo empleado
    let empleado = new Empleado({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_m,
        apellido_m: req.body.apellido_p,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    })
    //funcion guardar empleado con parametro error para cuando falle
    empleado.save(function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al guardar el empleado"
            res.json(response);
            return;
        }

        response.exito = true,
        response.msg = "El empleado se guardo correctamente"
        res.json(response)
    })
}

exports.find = function(req,res){
    Empleado.find(function(err, empleados){
        res.json(empleados)
    })
}

exports.findOne = function(req,res){
    Empleado.findOne({_id: req.params.id},function(err, empleado){
        res.json(empleado)
    })
}
//funcion req and response
exports.update = function(req,res){ 
    let empleado = ({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_m,
        apellido_m: req.body.apellido_p,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    })

    Empleado.findByIdAndUpdate(req.params.id, {$set: empleado}, function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al modificar el empleado"
            res.json(response)
            return;  
        }
        response.exito = true,
        response.msg = "El empleado se modifico correctamente"
        res.json(response)
    })
}

exports.remove = function(req,res){
    Empleado.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al eliminar el empleado"
            res.json(response)
            return;  
        }

        response.exito = true,
        response.msg = "El empleado se ha eliminado correctamente"
        res.json(response)
    })
} 