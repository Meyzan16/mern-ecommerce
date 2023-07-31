import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useAuth} from '../../context/Auth';

const Login = () => {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [auth,setAuth] = useAuth();


    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',{
              email,password
            });
            if(res && res.data.success){
                
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                //save di local strogae
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
                toast.success(res.data && res.data.message);
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went error')
        }
    }


  return (
    <Layout title={'Login'}>
            <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                <div className="mt-8 sm:mx-auto w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                    
                        
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input  type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="meyzan1605@gmail.com" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password </label>
                            <div className="mt-2">
                                <input  type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                            </div>
                        </div>
                    
                        <div>
                            <button type="submit" 
                            className="flex w-full mx-auto justify-center btn-submit">Sign in</button>
                        </div>

                    </form>
                    
                        <p className="mt-6 text-center text-sm text-gray-500 mb-2">
                            Don't have an account yet ? {" "}
                            <button onClick={ () => {
                                navigate('/register')}
                             } className="font-semibold leading-6 text-gray-800
                            hover:text-primary"> Register 
                            </button>
                        </p>

                        <p className="mt-2 text-center text-sm text-gray-500 mb-6 block">
                            forget password ? {" "}
                            <button onClick={ () => {
                                navigate('/forget-password')}
                            } className="font-semibold leading-6 text-gray-800
                            hover:text-primary"> forget </button>
                        </p>
                </div>
            </div>

    </Layout>
  )
}

export default Login