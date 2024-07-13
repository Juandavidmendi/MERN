const Usuario = require("../models/usuarios.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const yup = require('yup');

const loginSchema = yup.object().shape({
    usuario: yup.string().required('El usuario es requerido'),
    pass: yup.string().required('La contraseña es requerida')
});

const registerSchema = yup.object().shape({
    usuario: yup.string().required('El usuario es requerido').max(100, 'El usuario no puede tener más de 100 caracteres'),
    pass: yup.string().required('La contraseña es requerida').max(128, 'La contraseña no puede tener más de 128 caracteres')
});

exports.register = async function (req, res) {
    try {
        await registerSchema.validate(req.body);

        let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

        let newUser = new Usuario({
            usuario: req.body.usuario,
            pass: hashedpass
        });

        newUser.save(function (err) {
            if (err) {
                res.status(500).json({ error: "Error al registrar el usuario" });
                return;
            }

            res.status(201).json({ msg: "Usuario registrado exitosamente" });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async function (req, res, next) {
    try {
        await loginSchema.validate(req.body);

        let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

        Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass }, function (err, usuario) {
            let response = {
                token: null,
                msg: ""
            };
            if (usuario !== null) {
                response.token = jwt.sign({
                    id: usuario._id,
                    usuario: usuario.usuario
                }, "__recret__",
                    { expiresIn: '12h' });
            } else {
                response.msg = "Usuario o contraseña incorrectos";
            }
            res.json(response);
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.findOne = function (req, res) {
    Usuario.findOne({ _id: req.params.id }, function (err, usuario) {
        res.json(usuario);
    });
}

exports.find = function (req, res) {
    Usuario.find(function (err, usuarios) {
        res.json(usuarios);
    });
}
