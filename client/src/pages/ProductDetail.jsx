import React, { useState, useEffect } from "react";
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams,Link,useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  // get product
  const params = useParams();
  const navigate = useNavigate();
  const [product,setproduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(()=>{
    if(params?.slug) getProduct();
  },[params?.slug]);


  const getProduct = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setproduct(data?.products);
      getSimilar(data?.products._id, data?.products.category._id);

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong get single product")
    }
  }

  //get similar atau related product
  const getSimilar = async (pid,cid) => {
    try {
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
        toast.error("Something went wrong similar product")
    }
  }


  return (
    <Layout>
          <div>
              <h1 className='text-2xl font-normal text-slate-800'>{product?.name}</h1>
                
              <div className=' gap-8  md:flex  items-center  sm:flex-col md:flex-row mb-8 '>
                <div className='w-full md:basis-1/3 '>
                    <img src={`/api/v1/product/photo-product/${product?._id}`} 
                            className="aspect-square rounded-2xl object-cover" alt={product?.name} />
                </div>
                
                <div className='md:basis-3/4'>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        <span className='leading-normal'>
                          {product.description}
                        </span>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div>
                        Name : {product.name}
                      </div>
                      <div>
                        Category : {product?.category?.name}
                      </div>
                      <div>
                        Shipping : {product.shipping === 0 ? 'No' : 'Yes'} 
                      </div>
                    </div>
                    {/* Category : {product.category.name} <br /> */}

                    <div className='mt-4 md:max-w-lg bg-white shadow shadow-slate-400  rounded-2xl p-6 '>
                          <span className='font-bold text-2xl text-black text-center'>
                              ${product.price}
                          </span> Night

                          <button className='mt-4 w-full px-2 py-4 rounded-xl bg-gradient-to-r
                                  from-rose-500 to-red-500 text-white  duration-300 hover:ease-in hover:scale-105'>
                              <span className='mr-2'>
                                  ADD TO CARD
                              </span> 
                            
                          </button>
                    </div>
                </div>
              </div>
                          
          </div>

            <h1 className='text-2xl font-normal text-gray-500'>Related product</h1>
            {
              relatedProducts.length < 1 && (
                <div className="text-center">
                  <h3 className="text-xl">No similar products found</h3>
                </div>
              )
            }
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 mb-8'>
              {  
              relatedProducts?.map((item) => (
                        <Link  key={item._id} to={`/product/${item.slug}`}> 
                                          <div className="bg-gray-500 rounded-2xl flex mb-4 relative ">
                                            <img src={`/api/v1/product/photo-product/${item?._id}`} 
                                            className="aspect-square rounded-2xl object-cover" alt={item?.name} />

                                            <button onClick={() =>  navigate(`/product/${item.slug}`)}  className='cursor-pointer flex items-center text-base 
                                              gap-2 absolute bottom-2 left-2 py-2 px-4 bg-slate-100 hover:bg-primary hover:text-white
                                              rounded-2xl shadow-md shadow-gray-500'>
                                              More Details
                                            </button>
                                            
                                            <button className='cursor-pointer flex items-center text-base
                                                      gap-2 absolute bottom-2 right-2 py-2 px-4 bg-slate-100 hover:bg-primary hover:text-white
                                                      rounded-2xl shadow-md shadow-gray-500'>
                                                      Add To Cart
                                            </button>
                                          </div>


                                          <h2 className="text-bold text-base">
                                            {item.name}
                                          </h2>
                        
                                          <h3 className="text-gray-500 truncate text-base">
                                            {item.description}
                                          </h3>
                        
                                          <div className="mt-2 text-base flex gap-2">
                                              <span className="font-bold text-black">
                                                $ {item.price}/night
                                              </span> 
                                              <span className=" text-gray-500 font-bold">
                                                  {item.category.name}
                                              </span> 
                                          </div>
                  </Link>   

              ))
              }
            </div>
    </Layout>
  )
}

export default ProductDetail