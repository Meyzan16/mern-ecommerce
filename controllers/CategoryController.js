import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
         if(!name){
            return res.status(200).send({success:false,message: 'name category is required'})
         }

         const existingCategory = await categoryModel.findOne({name});
         if(existingCategory){
            res.status(200).send({
                success:false,
                message:'category already exisits',
            })
         }else{
            const category = await new categoryModel({name,slug:slugify(name)}).save()

            res.status(201).send({
                success:true,
                message:'New category created',
                category
            })
         }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error api new category',
            error
        })
    }
}

export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {name, slug:slugify(name)},
            {new:true}
        )

        res.status(200).send({
            success:true,
            message:'Category updated succesfully',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while updating category',
            error
        })
    }
}

// get all
export const categoryController = async (req,res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All categories list',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting all categories',
            error
        })
    }
}

///single category
export const singleCategoryController = async (req,res) => {
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({
            slug:slug
        })
        res.status(200).send({
            success:true,
            message:'Get single category succesfully',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single categories',
            error
        })
    }
}

///delete category
export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params
        const category = await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:'category deleted succesfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while delete categories',
            error
        })
    }
}