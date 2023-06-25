import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
         <footer className=' bg-[#12141e] py-8 '>
            <div className="container">
              <div className='md:flex items-center justify-between md:gap-8'>

                  <div className='w-full md:w-1/2 mb-5 md:mb-0'>
                    <h2 className='text-xl leading-10 text-white mb-4 md:text-xl '>
                      Do you want to buy beautiful products ?
                    </h2>
                    <a href="mailto:meyzan1605@gmail.com">
                                      <button className="px-4 py-2 rounded-lg bg-primary text-white font-[500] 
                                      flex items-center gap-2
                                      hover:bg-smallTextColor ease-in duration-300">
                                      Login 
                                      </button>
                    </a>
                  </div>

                  <div className='w-full md:1/2'>
                      <p className='text-gray-300 leading-7 mb-4 md:text-xl md:text-center'>Copyright © 2023 - All right reserved by Meyzan Al Yutra! </p>
        
                      <div className=' flex items-center gap-4 flex-wrap md:gap-4 md:justify-center'>

                        <span>
                                  <Link to='/about' className='text-lg text-gray-300 hover:text-primary hover:border-b-2  hover:border-b-primary '>About</Link> |
                        </span>
                        <span>
                                  <Link to='/contact' className='text-lg text-gray-300 hover:text-primary hover:border-b-2  hover:border-b-primary '>Contact</Link> |
                        </span>
                        <span>
                                  <Link to='/privacy-policy' className='text-lg text-gray-300 hover:text-primary hover:border-b-2  hover:border-b-primary '>Privacy policy</Link> |
                        </span>
                  

                      </div>
                  </div>
            </div>
          </div>

        </footer>

  )
}

export default Footer