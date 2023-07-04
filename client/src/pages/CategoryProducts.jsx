import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';


const CategoryProducts = () => {
    const [product, setProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const {pathname} = useLocation()
    let subPath = pathname.split('/')?.[1];

    const getProductByCat = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setcategory(data?.category)
        } catch (error) {
            console.log(error);
            toast.error("Something get product by category");
        }
    }

    useEffect(()=> {
        if(params?.slug) getProductByCat()
    },[params?.slug])

      
  return (
    <Layout>
        <div className='mb-8'>

            <h1 className='text-2xl text-primary mb-4'>Category {category?.name} </h1>
                    {
                            product?.length > 0 ? (
                                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6'>
                                               {product?.map((item,index) => (
                                                    <div  key={index}> 
                                                        <div className="group  overflow-hidden hover:scale-95 transition-all duration-500  bg-gradient-to-r
                                                        from-cyan-500 to-blue-500 rounded-2xl flex mb-4 relative">
                                                
                                                            <img src={`/api/v1/product/photo-product/${item._id}`} 
                                                                className="group-hover:scale-125
                                                                group-hover:rotate-12
                                                                transition-all duration-500 aspect-square rounded-2xl object-cover" alt={item.name} />
                                            
                                                            {
                                                            subPath === 'category' ? (
                                                                <>
                                            
                                                                    <button onClick={() =>  navigate(`/product/${item.slug}`)}  className='cursor-pointer flex items-center text-base 
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
                                                        {item.name}
                                                                                    </h2>
                                                                    
                                                        <h3 className="text-gray-500 truncate text-base">
                                                            {item.description}
                                                        </h3>
                                                    
                                            
                                                        <div className="mt-2 text-base flex gap-2 text-gray-500">
                                                            <span className="font-bold text-black">
                                                                IDR. {item.price} 
                                                            </span> {category?.name}
                                                        
                                                        </div>
                                                                    
                                                                                    
                                                                    
                                                    </div>   
                                                ))
                                                        }
                                </div>
                        ):(
                            <div className='text-center'>
                                Nothing product by category {category?.name}
                            </div>
                        )
                        
                    }



               
        </div>
    </Layout>
  )
}

export default CategoryProducts