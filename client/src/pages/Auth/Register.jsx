import React from "react";
import { useState } from "react";
import Layout from '../../components/layout/Layout';

import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [name,setname] = useState('');
    const [phone,setphone] = useState('');
    const [address,setaddress] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const navigate =  useNavigate();

    // handle submit
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',{
                name,password,phone,address,email
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
    <Layout title={'Register'}>
        <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input value={name} onChange={(e) => setname(e.target.value)}  type="text" placeholder="meyzan" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div className="mt-2">
                            <input  type="text" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="0857 7846 0907" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                        <div className="mt-2">
                            <input  type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="bengkulu" required />
                        </div>
                    </div>
                    
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
                        className="flex w-full mx-auto rounded-3xl  justify-center btn-submit">Sign in</button>
                    </div>

                </form>
                
                    <p className="mt-6 text-center text-sm text-gray-500 mb-6">
                        Already you account ? {" "}
                        <button onClick={ () => {
                                navigate('/login')}
                             } className="font-semibold leading-6 text-gray-800
                        hover:text-primary"> Login </button>
                    </p>
            </div>
        </div>

 </Layout>
  )
}

export default Register