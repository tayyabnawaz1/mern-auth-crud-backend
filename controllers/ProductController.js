const productModel=require("../models/ProductModel")

// create product
const createProducts=async(req , res)=>{
    try {
      const {name ,category,price}=req.body;

      const product= await productModel.findOne({name});
    if(product){
       return res.status(400).json({
            success:false,
            message:"product already exist!"
        })
    }
    const newproduct=await productModel.create({name,category,price})
     res.status(201).json({
        success:true,
        message:"Product created successfully!",
        product :newproduct
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
  
}

// get product

const getProducts=async(req , res)=>{
    try {
          const product= await productModel.find();
    if(product.length===0){
       return res.status(400).json({
            success:false,
            message:"product not found!"
        })
    }
     res.status(200).json({
        success:true,
        product
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
  
}

// product get by id

const getProductById=async(req , res)=>{
   
    try {
         const {id}=req.params;
          const product= await productModel.findById(id);
    if(!product){
      return res.status(400).json({
            success:false,
            message:"product not found!"
        })
    }
     return res.status(200).json({
        success:true,
        product
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
  
}

// update by id
const updateProduct=async(req , res)=>{
   
    try {
         const {id}=req.params;
          const product= await productModel.findByIdAndUpdate( 
           id,
            req.body,
            { new: true });;
    if(!product){
      return res.status(400).json({
            success:false,
            message:"product not found!"
        })
    }
      return res.status(200).json({
        success:true,
        message:"product updated successfully !",
        product 
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
  
}

// delete by id
const deleteProduct=async(req , res)=>{
   
    try {
         const {id}=req.params;
          const product= await productModel.findByIdAndDelete(id);;
    if(!product){
      return res.status(404).json({
            success:false,
            message:"product not found!"
        })
    }
     res.status(200).json({
        success:true,
        message:"product deleted successfully !",
        product 
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
  
}

 
module.exports={
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}