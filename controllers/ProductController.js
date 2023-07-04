import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import slugify from "slugify";

//create new products
export const createProductController = async (req,res ) => {
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !category: return res.status(200).send({success:false,message: 'Category is required'});
            case photo && photo.size > 1000000: 
                return res.status(200).send({
                    success:false,message: 'Photo is required and should be less then 1mb'
                });
            case !photo : 
                return res.status(200).send({
                    success:false,message: 'Photo is required'
                });
            case !name: return res.status(200).send({success:false,message: 'Name is required'});
            case !description: return res.status(200).send({success:false,message: 'Description is required'});
            case !price: return res.status(200).send({success:false,message: 'Price is required'});
            case !quantity: return res.status(200).send({success:false,message: 'Quantity is required'});
            case !shipping: return res.status(200).send({success:false,message: 'shipping is required'});
        }


        try{
            const products = new productModel({...req.fields, slug:slugify(name)})
            if(photo){
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save();
            res.status(201).send({
                success:true,
                message:"Product created successfully",
                products
            })
            
        }catch{
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error created product',
                error
            })
        }



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating new products',
            error
        })
    }
}

//get all products
export const getProductController = async(req,res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All products list',
            products,
        })
    }
    catch{
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in  getting products',
            error
        })
    }
}

///single product
export const singleProductController = async (req,res) => {
    try {
        const {slug} = req.params
        const products = await productModel.findOne({slug:slug}).populate("category").select("-photo")

        res.status(200).send({
            success:true,
            message:'Get single product succesfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single products',
            error
        })
    }
}

// get photo
export const productPhotoController = async (req,res) => {
    try {
        const {pid} = req.params;
        const product = await productModel.findOne({_id:pid}).select("photo");
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting photo products',
            error
        })
    }
}

//delete product
export const deleteProductController = async (req,res) => {
    try {
        const {pid} = req.params
        const product = await productModel.findByIdAndDelete(pid).select("-photo");

        res.status(200).send({
            success:true,
            message:'Product deleted succesfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while delete products',
            error
        })
    }
}

export const updateProductController = async (req,res) => {
    try {
     
        const {name,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name: return res.status(200).send({success:false, message: 'Name is required'});
            case !description: return res.status(200).send({success:false, message: 'Description is required'});
            case !price: return res.status(200).send({success:false, message: 'Price is required'});
            case !category: return res.status(200).send({success:false, message: 'Category is required'});
            case !quantity: return res.status(200).send({success:false, message: 'Quantity is required'});
            case photo && photo.size > 1000000: 
                return res.status(200).send({
                    success:false, message: 'Photo is required and should be less then 1mb'
                });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true}
        );

        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            products
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"Error while update products",
            error
        })
    }
}

// filters
export const productFiltersController = async (req,res) => {
    try{
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args).populate('category');
        res.status(200).send({
          success: true,
          products,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while filters products",
            error
        })
    }
}

export const productCountController = async (req,res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            message:"Product count successfully",
            count,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while product count',
            error
        })
    }
}

export const relatedProductController = async (req,res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(4).populate("category")
        res.status(200).send({
            success:true,
            message:"Product similar successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while similar product',
            error
        })
    }
}

export const productCategoryController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({category}).populate("category");
        res.status(200).send({
            success:true,
            message:"Category product successfully",
            category,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while category product list',
            error
        })
    }
}
