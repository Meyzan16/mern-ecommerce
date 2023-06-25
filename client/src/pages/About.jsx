import React from 'react'
import Layout from '../components/layout/Layout';
import about from "../assets/images/about.jpeg"

const About = () => {
  return (
    <Layout title={'About us'}>  
        <div className=' flex items-center justify-between 
                flex-wrap md:grid md:grid-cols-2  md:gap-4 lg:gap-8'>
                   <div>
                        <figure data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200" 
                        className="flex items-center justify-center bg-primary overflow-hidden rounded-lg">
                            <img src={about} alt="" className="w-full"/>
                        </figure>
                    </div>

                    <div className="w-full text-center md:text-left leading-relaxed"> 
                          <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vitae 
                              reprehenderit fuga qui at, obcaecati sed sapiente ipsa dolor quidem in illo? 
                              Rerum mollitia error pariatur. Accusamus voluptatem maxime laudantium doloremque 
                              nulla qui eveniet nemo quis dolore. Magni distinctio minus inventore sint optio, et ea quod architecto alias nobis ex sit tempore minima quo quae ad! Iure sint voluptas excepturi dolores consequuntur, numquam reiciendis natus qui id aliquid nulla
                               ducimus commodi dolorem rerum obcaecati! Ex dolorum cum rerum illo eius!
                           
                          </p> 
                      
                    </div>

                    
          </div>
    </Layout>
  )
}

export default About