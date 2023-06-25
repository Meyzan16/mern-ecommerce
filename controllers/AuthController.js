import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        // validations
        if(!name){
            return res.send({message: 'name is required'})
        }
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!password){
            return res.send({message: 'password is required'})
        }
        if(!phone){
            return res.send({message: 'phone is required'})
        }
        if(!address){
            return res.send({message: 'address is required'})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            res.status(200).send({
                success:false,
                message:'Email already please login',
            })
        }else{
            //jika tidak ada maka register
            const hashedPassword = await hashPassword(password);
            //save
            try {
                const userDoc = await userModel.create({
                    name,
                    email,
                    phone,
                    address,
                    password:hashedPassword
                });
                res.status(201).send({
                    success:true,
                    message: 'User register succesfully',
                    userDoc,
                }) 

            }catch (error) {
                console.log(error);
                res.status(500).send({
                    success:false,
                    message:'Error registering',
                    error
                })
            }  
            
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in register',
            error
        })
    }
}

// POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!password){
            return res.send({message: 'password is required'})
        }

        // validation
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message:'Inavlid email or password',
            })
        }
        
        //check user
        const user = await userModel.findOne({email})

        if(user){   
            const match = await comparePassword(password,user.password)

            if(match){
                //token
                const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET_KEY,{
                    expiresIn: "7d",
                });
                
                res.status(200).send({
                    success:true,
                    message:'login successful',
                    user:{
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        role: user.role,
                    },
                    token,
                })
            

            }else{
                return res.status(200).send({
                    success:false,
                    message:'Invalid password',
                })
            }
        }else{
            return res.status(200).send({
                success:false,
                message:'Email is not registered',
            })
        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }

}

// test controller
export const testController = async (req,res) => {
    try {
        res.send("protected routes");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}

export const forgetpassController = async (req,res) => {
    try {
        const {email,newPassword} = req.body;
        
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!newPassword){
            return res.send({message: 'New Password is required'})
        }

        //check user
        const user = await userModel.findOne({email})
        if(user){   
            const hashed = await hashPassword(newPassword);
            await userModel.findByIdAndUpdate(user._id,{
                password:hashed
            });
            res.status(200).send({
                success:true,
                message:"Password reset successfully",
            });
        }else{
            return res.status(200).send({
                success:false,
                message:'Email is not registered',
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}

