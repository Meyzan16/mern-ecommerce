import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title}) => {
  return (
    <div>
        <Helmet> 
                <title>{title}</title>
        </Helmet>
         
         
        <Header/>
            <main className='container min-h-[65vh]'>
                        <Toaster />
                        {children}
            </main>
        <Footer/>
    </div>
  )
};

export default Layout
