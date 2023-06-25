import express from "express";
import {registerController,loginController,testController,forgetpassController} from '../controllers/AuthController.js';
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";

//route object
const router = express.Router();

// routing
//register || method GET
router.post('/register', registerController);

// login || method POST
router.post('/login', loginController);

//Forget password || POST
router.post('/forget-password', forgetpassController);

//test routes
router.get('/test', requireSignIn,isAdmin, testController);

//protected routes user auth
router.get('/user-auth',requireSignIn, (req, res) => {
    res.status(200).send({ok:true})
})

//protected routes admin auth
router.get('/admin-auth',requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok:true})
})

export default router;

