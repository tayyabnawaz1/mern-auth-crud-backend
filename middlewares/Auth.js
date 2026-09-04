const Joi = require("joi");
const joi=require("joi");


// validate for signup

const validateSignup=async(req,res,next)=>{
    const Schema=Joi.object({
        name:joi.string().min(3).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(20).required()
    });

    const {error}=Schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message:"Bad Request",
            error
        })
    }
    next();
}



// validate for login

const validateLogin=async(req,res,next)=>{
    const Schema=Joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(20).required()
    });

    const {error}=Schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message:"Bad Request",
            error
        })
    }
    next();
}


module.exports={
    validateSignup,
    validateLogin,
}