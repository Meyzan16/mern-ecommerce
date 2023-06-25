import React from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - Admin'}>
          <AdminMenu />

          <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg mt-6'>
              <h1 className='text-2xl text-primary'>Admin dashboard</h1>

              <div className='mt-6 md:max-w-xl text-base font-normal'>

                <div className='md:flex items-center mb-6 '>

                  <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                    nama
                  </div>

                  <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                    {auth?.user?.name}
                  </div>
                </div>

                <div className='md:flex items-center mb-6 '>

                  <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                    email
                  </div>

                  <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                    {auth?.user?.email}
                  </div>
                </div>

                <div className='md:flex items-center mb-6 '>

                  <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                    contact
                  </div>

                  <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                    {auth?.user?.phone}
                  </div>
                </div>

                
              </div>


          </div>

    </Layout>
  )
}

export default Dashboard
