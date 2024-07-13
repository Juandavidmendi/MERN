const Usuario = require("../models/usuarios.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const yup = require('yup');

const loginSchema = yup.object().shape({
    usuario: yup.string().required('El usuario es requerido'),
    pass: yup.string().required('La contraseña es requerida')
});

exports.login = async function(req, res, next) {
    try {
        await loginSchema.validate(req.body);

        let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

        Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass }, function(err, usuario) {
            let response = {
                token: null,
            }
            if (usuario !== null) {
                response.token = jwt.sign({
                    id: usuario._id,
                    usuario: usuario.usuario
                }, "__recret__",
                { expiresIn: '12h' });
            }
            res.json(response);
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.findOne = function(req, res) {
    Usuario.findOne({ _id: req.params.id }, function(err, usuario) {
        res.json(usuario);
    });
}

exports.find = function(req, res) {
    Usuario.find(function(err, usuarios) {
        res.json(usuarios);
    });
}
