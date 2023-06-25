import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import { 
    createProductController,
    getProductController,
    singleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFiltersController,
    productCountController,
    relatedProductController,
    productCategoryController
    // productListController
} 
from '../controllers/ProductController.js';

import  formidable from 'express-formidable';

const router = express.Router();

// routes new
router.post('/create-product',requireSignIn, isAdmin,formidable(), createProductController);

//update 
router.put('/update-product/:pid',requireSignIn, isAdmin,formidable(), updateProductController);

//get products
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', singleProductController);

//get photo
router.get('/photo-product/:pid', productPhotoController);

//delet products
router.delete('/delete-product/:pid', requireSignIn, deleteProductController);

//filter products
router.post('/filters-product', productFiltersController);

//product count
router.get('/product-count', productCountController);

// similar product
router.get('/related-product/:pid/:cid', relatedProductController);

//product per page
// router.get('/product-list/:page', productListController);

//router category product
router.get('/product-category/:slug', productCategoryController);


export default router;