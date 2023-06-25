import React from 'react'
import Layout from '../components/layout/Layout'
import {HiEnvelope} from 'react-icons/hi2';
import {HiPhone} from 'react-icons/hi2';
import { BsGithub } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import contactus from "../assets/images/contactus.jpeg"

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
          <div className='flex items-center justify-between 
                flex-wrap md:grid md:grid-cols-2  md:gap-4 lg:gap-8 '>
                    <div className="w-full text-center md:text-left"> 
                        <h5 data-aos="fade-right" data-aos-duration="1500" className=" text-stone-700
                        text-lg md:text-xl font-[600]">
                            Hello welcome
                        </h5>
                        <h1 data-aos="fade-up" data-aos-duration="1800" data-aos-delay="200" className="py-4
                         text-stone-900 font-[800]
                            text-[1.8rem] sm:text-[40px] leading-[35px] sm:leading-[46px]">I'm Meyzan Al Yutra 
                            <br /> 
                            <span className="text-[1.4rem] sm:text-[40px]">
                                Software Engineer
                            </span> 
                        </h1>

                        <div data-aos="fade-up" data-aos-duration="1800" data-aos-delay="200" 
                            className="flex items-center justify-center md:justify-normal gap-6 py-4">
                            <a href="mailto:meyzan1605@gmail.com">
                                <button className="px-4 py-2 rounded-lg bg-primary text-white font-[500] flex items-center gap-2
                                hover:bg-smallTextColor ease-in duration-300">
                                    <HiEnvelope className='text-xl' />Hire me
                                </button>
                            </a>
                          
                        </div>
                        

                          <p>
                              Any query and info about product feel to call anytime we 24x7 available
                           
                          </p> 
                        
                        <div className="flex items-center justify-center md:justify-normal gap-4 py-4">
                            {/* <span className="text-stone-700 text-[15px] ">Follow me :</span> */}

                            <span data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100">
                                    <a href="https://github.com/meyzan16" className="sm:w-12 sm:h-12 w-10 h-10
                                            rounded-full justify-center border
                                            border-slate-300 hover:border-primary
                                            transition-all duration-300 hover:ease-in hover:scale-125
                                            hover:text-white  flex items-center text-white bg-primary text-[18px] sm:text-[29px]">
                                                <BsGithub />
                                    </a>
                                </span>
                                <span data-aos="zoom-in" data-aos-duration="800" data-aos-delay="300">
                                    <a href={"https://www.instagram.com/adzanmagrib.e/"}  className="sm:w-12 sm:h-12 w-10 h-10 
                                            rounded-full justify-center border
                                            border-slate-300 hover:border-primary
                                            transition-all duration-300 hover:ease-in hover:scale-125
                                            hover:text-white  flex items-center text-white bg-primary text-[18px] sm:text-[29px]" 
                                            >
                                              <BsInstagram />
                                    </a>
                                </span>
                                <span data-aos="zoom-in" data-aos-duration="800" data-aos-delay="400">
                                    <a href={"https://api.whatsapp.com/send/?phone=6285783248518&amp;text=Hi, Meyzan Al Yutra&amp;type=phone_number&amp;app_absent=0"} className="sm:w-12 sm:h-12 w-10 h-10
                                            rounded-full justify-center border
                                            border-slate-300 hover:border-primary
                                            transition-all duration-300 hover:ease-in hover:scale-125
                                            hover:text-white  flex items-center text-white bg-primary text-[18px] sm:text-[29px]">
                                               <HiPhone />
                                    </a>
                                </span>
                        </div>
                    </div>

                    <div>
                        <figure data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" 
                        className="flex items-center justify-center bg-primary overflow-hidden rounded-lg">
                            <img src={contactus} alt="" className="w-full"/>
                        </figure>
                    </div>
          </div>
    </Layout>
  )
}

export default Contact