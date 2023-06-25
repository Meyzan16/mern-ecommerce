import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import { createCategoryController,updateCategoryController , categoryController,singleCategoryController,deleteCategoryController } from '../controllers/CategoryController.js';


const router = express.Router();

//rooutes
router.post('/create-category',requireSignIn, isAdmin, createCategoryController);
//update
router.put('/update-category/:id',requireSignIn, isAdmin, updateCategoryController);

// get all
router.get('/get-category', categoryController);

// single category
router.get('/single-category/:slug', singleCategoryController);

//delete
router.delete('/delete-category/:id',requireSignIn,isAdmin, deleteCategoryController);



export default router;

