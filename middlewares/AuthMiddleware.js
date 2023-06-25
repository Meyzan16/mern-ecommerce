import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error with authorization',
            error
        })
    }
}

// admin access routes
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(200).send({
                success:false,
                message:'UnAuthorized access and access denied',
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error admin middleware',
            error
        })
    }
}