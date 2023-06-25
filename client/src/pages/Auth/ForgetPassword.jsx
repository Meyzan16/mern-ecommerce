import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email,setemail] = useState('');
    const [newPassword,setnewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forget-password',{
              email,newPassword
            });

            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went error')
        }
    }

  return (
    <Layout title={'forget-password'}>
            <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight
                     text-gray-900">Forget Password</h2>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                    
                        
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input  type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="meyzan1605@gmail.com"  />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                            <div className="mt-2">
                                <input  type="password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)}   />
                            </div>
                        </div>
                    
                        <div>
                            <button type="submit" 
                            className="flex w-full mx-auto rounded-3xl  justify-center btn-submit">Submit</button>
                        </div>

                    </form>
                    
                        <p className="mt-6 text-center text-sm text-gray-500 mb-2">
                            Already account ? {" "}
                            <button onClick={ () => {
                                navigate('/login')}
                             } className="font-semibold leading-6 text-gray-800
                            hover:text-primary"> Login 
                            </button>
                        </p>

                    
                </div>
            </div>

    </Layout>
  )
}

export default ForgetPassword