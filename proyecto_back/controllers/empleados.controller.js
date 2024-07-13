const Empleado = require('../models/empleados.model');
const yup = require('yup');

const empleadoSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    apellido_p: yup.string().required('El apellido paterno es requerido'),
    apellido_m: yup.string().required('El apellido materno es requerido'),
    telefono: yup.string().required('El teléfono es requerido').matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos'),
    mail: yup.string().required('El correo electrónico es requerido').email('El correo electrónico no es válido'),
    direccion: yup.string().required('La dirección es requerida')
});

let response = {
    msg: "",
    exito: false
}
exports.create = async function (req, res) {
    try {
        await empleadoSchema.validate(req.body);

        let empleado = new Empleado({
            nombre: req.body.nombre,
            apellido_p: req.body.apellido_m,
            apellido_m: req.body.apellido_p,
            telefono: req.body.telefono,
            mail: req.body.mail,
            direccion: req.body.direccion
        });

        empleado.save(function (err) {
            if (err) {
                console.log(err);
                response.exito = false;
                response.msg = "Error al guardar el empleado";
                res.json(response);
                return;
            }

            response.exito = true;
            response.msg = "El empleado se guardo correctamente";
            res.json(response);
        });
    } catch (error) {
        response.exito = false;
        response.msg = error.message;
        res.json(response);
    }
}

exports.find = function (req, res) {
    Empleado.find(function (err, empleados) {
        res.json(empleados)
    })
}

exports.findOne = function (req, res) {
    Empleado.findOne({ _id: req.params.id }, function (err, empleado) {
        res.json(empleado)
    })
}
//funcion req and response
exports.update = async function (req, res) {
    try {
        await empleadoSchema.validate(req.body);

        let empleado = ({
            nombre: req.body.nombre,
            apellido_p: req.body.apellido_m,
            apellido_m: req.body.apellido_p,
            telefono: req.body.telefono,
            mail: req.body.mail,
            direccion: req.body.direccion
        });

        Empleado.findByIdAndUpdate(req.params.id, { $set: empleado }, function (err) {
            if (err) {
                console.log(err);
                response.exito = false;
                response.msg = "Error al modificar el empleado";
                res.json(response);
                return;
            }
            response.exito = true;
            response.msg = "El empleado se modifico correctamente";
            res.json(response);
        });
    } catch (error) {
        response.exito = false;
        response.msg = error.message;
        res.json(response);
    }
}

exports.remove = function (req, res) {
    Empleado.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
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