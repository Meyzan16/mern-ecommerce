import React from 'react'
import {NavLink, Link, useLocation} from 'react-router-dom';
import { HiShoppingBag } from "react-icons/hi2";
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import { useState } from "react";
import useCategory from '../../hooks/useCategory';

const Header = () => {
  const [auth,setAuth] = useAuth();
  const categories = useCategory();
  const [isOpen, setIsOpen] = useState(false)

 // cek pathname
 const {pathname} = useLocation()
 let page = pathname;
//  console.log(pathname);

// dropdown menu
const [toggle, setToggel] = useState(false);


let clasess ='text-base font-[600] text-primary ';

const homeClass = page === "/" ? clasess : "hover:text-primary";
const register = page === "/register" ? clasess : "hover:text-primary";
const login = page === "/login" ? clasess : "hover:text-primary";
const logout = page === "/logout" ? clasess : "text-base text-gray-700  hover:text-primary";
const cart = page === "/cart" ? clasess : "hover:text-primary";

const dropdown = page === "/dashboard/admin"  ? "absolute right-0 top-14 flex flex-col text-right justify-end  py-4 px-2 border border-gray-50 rounded-xl bg-gray-50 min-w-[210px] gap-2" : "dropdown";


const handleLogout = () => {
  setAuth({
    user:null,
    token:''
  })
  localStorage.removeItem('auth');
  toast.success('Logout Succesfully');
}

  return (
    <>
        <div className='container'>      
              <header className='flex w-full h-[80px] leading-[80px] items-center 
              justify-between  '>
                          <Link to='/' className="flex items-center gap-2">
                              <HiShoppingBag className='text-5xl text-primary'/>                        
                              <div className="leading-relaxed">
                                  <h2 className="text-lg text-primary font[700]">Ecommerce App</h2>
                              </div>
                          </Link>

                        {/* desktop navigation */}
                        <div className="menu" >
                            <ul className="flex items-center gap-10">
                                  <li>
                                    <NavLink to='/'  className={homeClass} >Home</NavLink>
                                  </li>

                                  <li className='flex relative'>
                                     <div className="inline-block text-left">
                                      <NavLink 
                                        className="inline-flex justify-center w-full rounded-md" 
                                        onClick={() => setIsOpen(!isOpen)} >
                                        Category
                                      </NavLink>

                                      {isOpen &&  ( 
                                        <div className="absolute w-56 rounded-md shadow-lg bg-white ">
                                          <div >
                                                  <Link Link to={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                All Category
                                                </Link>

                                            { categories?.map((item) => (
                                                <Link to={`/category/${item.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                {item.name}
                                                </Link>
                                              ))
                                            }
                                          </div>
                                        </div>
                                      )
                                      }
                                    </div>
                                  </li>

                                  <li><NavLink to='/cart'  className={cart}  >Cart</NavLink></li>  
                                  
                                  {
                                    auth.user ? ( <>
                         
                                      <div className='flex relative'>
                                      
                                          <div className='flex'>     
                                              {/* jika toggle di klik maka jalankan state */}
                                              <li><NavLink className="hover:text-primary"  onClick={()=> setToggel((prev) => !prev )} >
                                                {
                                                   auth?.user?.role === 1 ? "admin" : "user"
                                                } 
                                              </NavLink></li>

                                              {/* ketika di klik maka akan jalankan script berikut di ambil dari state togglle */}

                                              {
                                                toggle && (
                                                  <div className={dropdown}>

                                                  {
                                                    
                                                    page === '/dashboard/admin' ?  (
                                                      <div  className='text-base  text-gray-700 font-medium border-b-2' 
                                                        onClick={()=> setToggel(false)}>
                                                        My {auth?.user?.name}  
                                                      </div>
                                                      )
                                                     : (
                                                      <NavLink to={`/dashboard/${
                                                        auth?.user?.role === 1 ? "admin" : "user"
                                                      }`} className='dropdown_link border-b-2' 
                                                        onClick={()=> setToggel(false)}>
                                                        Dashboard
                                                      </NavLink>
                                                    ) 
                                                  }
                                                  
                                                    <NavLink onClick={handleLogout} to='/login' className={logout}  >Logout</NavLink>
                                                  </div>
                                                )
                                              }
                                          </div>
                                      </div>
                                      
                                    </>) : (
                                      <>
                                      <li><NavLink to='/register' className={register}  >Register</NavLink></li>
                                      <li><NavLink to='/login' className={login}  >Login</NavLink></li>

                                      </>
                                    )
                                  }

                                  
                            </ul>
                        </div>

          
              </header>
        </div>
    </>
  )
}

export default Header