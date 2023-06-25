import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu';

const Profile = () => {
  return (
    <Layout title={'profile - Admin'}>
        <UserMenu />

        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6
        leading-relaxed text-xl font-bold border-l-4
        border-solid border-teal-500 shadow-lg mt-6'>
            <h1 className='text-2xl text-primary'>Profile</h1>

            


        </div>
    </Layout>
  )
}

export default Profile