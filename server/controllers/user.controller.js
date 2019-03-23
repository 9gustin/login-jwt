var UserController = {};

var User = require('../models/user');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');

var userValidator = require('../validacion/user.validator');



UserController.postUser = async (req, res) => {
    //Tomar los datos 
    var params = req.body;

    // Validar los datos
    //Controlar si los datos para registrar estan, sino es una bad request
    if (params.username != undefined && params.email != undefined &&
        params.password != undefined && params.confirm_password != undefined) {

        //si se pasaron los datos necesarios se procede a verificar campo por campo que sean correctos
        let { errors, isValid } = userValidator.register(params);

        if (isValid) //si los datos ya estan validados 
        {
            //verificar que no exista ya un usuario con ese email o username
            let ocupado = false;

            //verificar email
            let users = await User.find({ email: params.email });

            if (users.length > 0) {
                ocupado = true;
                res.status(200).json({ message: "El email ingresado ya esta en uso" });
            } else { // si el email esta disponible, verifica username
                users = await User.find({ username: params.username });

                if (users.length > 0) {
                    ocupado = true;
                    res.status(200).json({ message: "El username ingresado ya esta en uso" });
                }
            }
            if (!ocupado) {//si el username y el mail estan disponibles
                //encriptar contraseña
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if (err) {
                        res.status(500).json({ message: "Error encriptando la contraseña", err });
                    }
                    else {
                        //crear usuario para guardar
                        let user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: params.username,
                            password: hash,
                            email: params.email.toLowerCase(),
                            created_at: Date.now(),
                            bio: (params.bio) ? params.bio : ''
                        });
                        //guardar usuario
                        user.save((err, userSaved) => {
                            if (err) {
                                res.status(500).json({ message: "El usuario no pudo ser guardado" });
                            }
                            else {
                                if (!userSaved) { res.status(500).json({ message: "El usuario no fue guardado" }); }
                                else { res.status(201).json({ message: "Usuario guardado correctamente" }); }
                            }
                        });//end user.save

                    }
                });//end bcrypt()

            }//end if(!ocupado)

        }
        else { res.status(200).json(errors); } //si la validacion dio false se devuelven los errores en los datos ingresados
    }
    else {
        res.status(400).json({ message: "The user data is not complete" });//datos undefinded
    }
}

UserController.getUsers = async (req, res) => {
    try {
        let users = await User.find();

        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error inesperado" });
    }
}

UserController.LoginUser = async (req, res) => {
    let params = req.body;
    //valida si se pasan los campos necesarios 
    if (params.username != undefined && params.password != undefined) {

        let { errors, isValid } = userValidator.login(params);

        if (isValid) {//validacion de los datos ingresados

            //buscar un usuario con ese nombre de usuario
            let user = await User.findOne({ username: params.username });

            if (!user)//si no se encontro el usuario 
            { res.status(200).json({ message: "No se encontro un usuario con ese nombre de usuario" }); }
            else {//si se encontro el usuario hay que comparar las contraseñas 
                bcrypt.compare(params.password, user.password, (err, ok) => {
                    if (err) {
                        res.status(500).json({ message: "Ocurrio un error inesperado" });
                    }
                    else if (ok) {
                        user.password = undefined;
                        res.status(200).json(user);
                    }
                    else {
                        res.status(200).json({ message: "Contraseña incorrecta" });
                    }
                })
            }
        }//end if isValid
        else {

            res.status(200).json(errors);
        }

    }//end if undefined
    else {
        res.status(400).json({ message: "No se pasaron los datos correctos para realizar el login" })
    }
}
module.exports = UserController;