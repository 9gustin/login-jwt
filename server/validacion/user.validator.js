var validator = require('validator');

var UserValidator = {};

UserValidator.register = (userData)=>{

    //Pregunta si tienen valor sino se los setea a ''
    userData.username = !validator.isEmpty(userData.username) ? userData.username : '';
    userData.password = !validator.isEmpty(userData.password) ? userData.password : '';
    userData.email = !validator.isEmpty(userData.email) ? userData.email : '';
    userData.confirm_password = !validator.isEmpty(userData.confirm_password) ? userData.confirm_password : '';

    let errors = {};

    if(validator.isEmpty(userData.username)){
        errors.username = "The username cannot be empty";
    }
    else if(!validator.isLength(userData.username, {min:6, max:20})){
        errors.username = "The username must contain between 6 and 20 characters."
    }

    if(validator.isEmpty(userData.password)){
        errors.password = "The password cannot be empty";
    }
    else if(!validator.isLength(userData.password, {min:6, max:20})){
        errors.password = "The password must contain between 6 and 20 characters."
    }

    if(validator.isEmpty(userData.email)){
        errors.email = "The email cannot be empty";
    }
    else if(!validator.isEmail(userData.email)){
        errors.email="The email entered is not a valid email. Please enter an email";
    }
    
    if(validator.isEmpty(userData.confirm_password)){
        errors.confirm_password = "The confirm password cannot be empty";
    } else if(!validator.equals(userData.password, userData.confirm_password)){
        errors.confirm_password = "The passwords not be equals";
    }

    let valid = (errors.username || errors.password || errors.email || errors.confirm_password ) ? false : true;

    return {
        errors,
        isValid : valid
    }


}

module.exports = UserValidator;
