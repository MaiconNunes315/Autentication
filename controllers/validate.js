const Joi= require('@hapi/joi');


const registerValidate = (data) =>{
    const schrema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email:Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(50),
    })
    return schrema.validate(data)
}

const loginValidate = (data) =>{
    const schrema = Joi.object({
    
        email:Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(50),
    })
    return schrema.validate(data)
}

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;

