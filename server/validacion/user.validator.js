var validator = require('validator');

var UserValidator = {};

UserValidator.register = (userData)=>{

    //Pregunta si tienen valor sino se los setea a ''
    userData.username = !validator.isEmpty(userData.username) ? userData.username : '';
    userData.password = !validator.isEmpty(userData.password) ? userData.password : '';
    userData.email = !validator.isEmpty(userData.email) ? userData.email : '';
    userData.confirm_password = !validator.isEmpty(userData.confirm_password) ? userData.confirm_password : '';

    let errors = {};
    //validar nombre de usuario
    if(validator.isEmpty(userData.username)){
        errors.username = "El nombre de usuario no puede estar vacio";
    }
    else if(!validator.isLength(userData.username, {min:6, max:20})){
        errors.username = "El nombre de usuario debe contener entre 6 y 20 caracteres"
    }
    //validar contraseña
    if(validator.isEmpty(userData.password)){
        errors.password = "La contraseña no puede estar vacia";
    }
    else if(!validator.isLength(userData.password, {min:6, max:20})){
        errors.password = "La contraseña debe contener entre 6 y 20 caracteres"
    }
    //validar email
    if(validator.isEmpty(userData.email)){
        errors.email = "El mail no puede estar vacio";
    }
    else if(!validator.isEmail(userData.email)){
        errors.email="Ingrese un mail valido";
    }
    //validar confirmacion de contraseña
    if(validator.isEmpty(userData.confirm_password)){
        errors.confirm_password = "Confirme su contraseña";
    } else if(!validator.equals(userData.password, userData.confirm_password)){
        errors.confirm_password = "Las contraseñas ingresadas no coinciden";
    }
    //verifica si los datos son validos, fijandose si no existen errores 
    let valid = (errors.username || errors.password || errors.email || errors.confirm_password ) ? false : true;

    return {
        errors,
        isValid : valid
    }


}

UserValidator.login = (userData)=>{
    //completa si estan vacios

    userData.username = !validator.isEmpty(userData.username) ? userData.username : '';
    userData.password = !validator.isEmpty(userData.password) ? userData.password : '';

    let errors = {};
    //username
    if(validator.isEmpty(userData.username)){

        errors.username = "Ingresa un nombre de usuario";
    }
    else if(!validator.isLength(userData.username, {min:6, max : 20})){
        errors.username = "El nombre de usuario debe contener entre 6 y 20 caracteres";
    }
    //password
    if(validator.isEmpty(userData.password)){
        errors.password = "Ingrese una contraseña";
    }else if(!validator.isLength(userData.password, {min:6, max:20})){
        errors.password="La contraseña debe tener entre 6 y 20 caracteres";
    }

    //verifica si es valido
    let valid = (errors.username || errors.password) ? false : true;
    return {
        errors,
        isValid : valid
    }
}

module.exports = UserValidator;
