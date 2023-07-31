import React from 'react'
import { NavLink , useLocation} from 'react-router-dom';
import { HiClipboardDocumentList } from "react-icons/hi2";
import { HiHome } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";

const UserMenu = () => {
   // cek pathname
   const {pathname} = useLocation()
   let subpage = pathname.split('/')?.[3];
  //  console.log(subpage);


   if(subpage === undefined){
       subpage = 'user'; 
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
                <NavLink to='/dashboard/user'  className={linkClasses('user')}>
                  <HiHome  className='text-xl'/>
                  Dashboard
                </NavLink>
              
                <NavLink to="/dashboard/user/profile" className={linkClasses('profile')}>
                  <HiUser className='text-xl'/>
                  Profile
                </NavLink>

                <NavLink to="/dashboard/user/orders" className={linkClasses('orders')}>
                  <HiClipboardDocumentList className='text-xl'/>
                  Orders
                </NavLink>

            </nav>
  )
}

export default UserMenu
