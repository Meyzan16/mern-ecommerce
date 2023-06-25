import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu';

const AllUsers = () => {
  return (
    <Layout title={'All Users - Admin'}>
        <AdminMenu />

        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6
        leading-relaxed text-xl font-bold border-l-4
        border-solid border-teal-500 shadow-lg mt-6'>
            <h1 className='text-2xl text-primary'>All Users</h1>

            


        </div>
    </Layout>
  )
}

export default AllUsers