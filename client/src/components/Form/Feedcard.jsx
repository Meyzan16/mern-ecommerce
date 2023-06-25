
import React from 'react'
import { useNavigate,useLocation,Link} from 'react-router-dom';

const Feedcard = ({product,index}) => {
  const navigate = useNavigate();
  
  const {pathname} = useLocation()
  // let subpage = pathname.split('/')?.[1];
  
  let subPageTo = pathname.split('/')?.[3];
  // console.log(subPageTo);
  const toPage = subPageTo === 'products' ? `/dashboard/admin/product/${product.slug}` : '/';
  


  return (
    <>
       <Link  key={product._id} to={toPage}> 
          <div className="group  overflow-hidden hover:scale-95 transition-all duration-500  bg-gradient-to-r
           from-cyan-500 to-blue-500 rounded-2xl flex mb-4 relative">
     
              <img src={`/api/v1/product/photo-product/${product._id}`} 
                  className="group-hover:scale-125
                  group-hover:rotate-12
                  transition-all duration-500 aspect-square rounded-2xl object-cover" alt={product.name} />

              {
                pathname === '/' ? (
                    <>
                      {/* <button onClick={moreDetails} className='cursor-pointer flex items-center text-base 
                        gap-2 absolute top-3  py-2 px-4 bg-primary text-white
                        rounded-r-2xl shadow-md shadow-gray-500'>
                        MEJA {index + 1}
                      </button> */}

                      <button onClick={(ev) =>  ev.preventDefault(navigate(`/product/${product.slug}`)) } className='cursor-pointer flex items-center text-base 
                        gap-2 absolute bottom-2 left-2 py-2 px-4 bg-slate-100 hover:bg-primary hover:text-white
                        rounded-2xl shadow-md shadow-gray-500'>
                        More Details
                      </button>


                      <button className='cursor-pointer flex items-center text-base
                        gap-2 absolute bottom-2 right-2 py-2 px-4 bg-slate-100 hover:bg-primary hover:text-white
                        rounded-2xl shadow-md shadow-gray-500'>
                        Add To Buy
                      </button>
                                                        
                    </>
                ) : (
                  ''
                )
              }
          </div>

          <h2 className="text-bold text-base">
            {product.name}
                                        </h2>
                      
          <h3 className="text-gray-500 truncate text-base">
              {product.description}
          </h3>
          {/* <div className="grid grid-cols-2 md:grid-cols-2 text-base items-center justify-between gap-2">
            <div className='bg-primary text-white p-2 rounded-2xl text-center'>
              Mulai : 21:11:31
            </div>
            <div className='bg-primary text-white p-2 rounded-2xl text-center'>
              Durasi : 00:39:47
            </div>
            <div className='bg-red-600 text-white p-2 rounded-2xl text-center'>
              Sisa : 00:39:47
            </div>
            <div className='bg-red-600 text-white p-2 rounded-2xl text-center'>
              Total IDR : 87.000
            </div>
          </div> */}

          <div className="mt-2 text-base flex gap-2 text-gray-500">
              <span className="font-bold text-black">
                  IDR. {product.price} 
              </span> 
              <span className=" text-gray-500 font-bold">
                {product.category.name}
              </span> 
          </div>
                      
                                       
                      
      </Link>   
            
                         
    </>
  )
}

export default Feedcard