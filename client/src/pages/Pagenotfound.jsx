import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <Layout title={'go back - page not found'}>
        <div className='py-24 flex justify-center items-center flex-col '>
            <h1 className='text-6xl md:text-8xl text-gray-900'>404</h1>
            <h2 className=' text-3xl md:text-4xl leading-normal mb-6 text-gray-500'>Oops ! Page Not Found</h2>
            <Link to='/' className='py-2 px-4 border border-slate-950 hover:border-primary bg-white text-black hover:bg-primary hover:text-white text-base rounded-lg '>
              Go Back
            </Link>
        </div>
    </Layout>
  )
}

export default Pagenotfound