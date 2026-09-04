const joi=require("joi");

const createProductvalidate=(req,res,next)=>{

    const schema=joi.object({
        name:joi.string().min(3).max(30).required(),
        category:joi.string().required(),
        price:joi.number().positive().required()
    })
    const {error}= schema.validate(req.body)
    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message,
            
        })
    }
    next();
}

const updateProductvalidate=(req,res,next)=>{

    const schema=joi.object({
        name:joi.string().min(3).max(30),
        category:joi.string(),
        price:joi.number().positive()
    }).min(1)
    const {error}= schema.validate(req.body)
    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message,
            
        })
    }
    next();
}


module.exports={
    createProductvalidate,
    updateProductvalidate,
}