import React from 'react'
import { NavLink , useLocation} from 'react-router-dom';
import { HiUserPlus } from "react-icons/hi2";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { HiHome } from "react-icons/hi2";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

const AdminMenu = () => {

  // cek pathname
  const {pathname} = useLocation()
  let subpage = pathname.split('/')?.[3];
  // console.log(subpage);


  if(subpage === undefined){
      subpage = 'admin'; 
  }

  function linkClasses(type=null){    
   let clasess ='flex py-2 px-4 items-center  bg-gray-500 rounded-2xl text-white gap-2';
   if(type === subpage){
     clasess += ' bg-primary text-white';
   }else{
     clasess += ' bg-gray-500'
   }
   return clasess;
 }

  return (            
            <nav className="flex flex-wrap  gap-3 ">
             
                <NavLink to='/dashboard/admin' className={linkClasses('admin')}>
                  <HiHome  className='text-xl'/>
                  Dashboard
                </NavLink>
              
                <NavLink to="/dashboard/admin/create-category" className={linkClasses('create-category')}>
                  <HiClipboardDocumentCheck className='text-xl'/>
                  Category
                </NavLink>
                <NavLink to="/dashboard/admin/products" className={linkClasses('products')}>
                  <HiClipboardDocumentList className='text-xl'/>
                  Products
                </NavLink>

                <NavLink to="/dashboard/admin/users" className={linkClasses('users')}>
                  <HiUserPlus className='text-xl'/>
                  User
                </NavLink>
            </nav>
  )
}

export default AdminMenu
