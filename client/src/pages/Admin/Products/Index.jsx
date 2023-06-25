import React,{useState, useEffect} from 'react'
import Layout from '../../../components/layout/Layout';
import AdminMenu from '../../../components/layout/AdminMenu';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Feedcard from '../../../components/Form/Feedcard';

const FeedCardList = ({data,getItems}) => {
  return (
    <>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6'>
        {
    
           data?.slice(0, getItems)?.map((item) => (
            <Feedcard 
            key={item._id} 
            product={item} 
            />
            )
          )
      
          }
      </div>
    
    </>
  )
}

const Index = () => {


  const [getItems, setItems] = useState(4);

  const loadMoreHandler = () => {
    setItems(prev => prev+3)
  }

    const [products,setProducts] = useState([]);
    const [total,settotal] = useState(0);
    // const [total,settotal] = useState(0);

    const [seacrhtext, setSeacrhtext] = useState('');
    const [seacrhTimeout, setseacrhTimeout] =  useState(null);
    const [searchResults, setsearchResults] =  useState([]);



   

    // serach filter engine
    const filterSearch = (seacrhtext) => {
      const regex = new RegExp(seacrhtext, "i"); // "i" flag for case-insensitive search
      return products.filter(
        (item) => 
          regex.test(item.name) ||
          regex.test(item.description)
      );
    }


    //getAll products
    const getAllProducts = async () =>{
        try {
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllProducts();
        getTotal();
    },[])

     //getotalcount
  const getTotal = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/product-count`)
      settotal(data?.count);
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong get count products')
    }
  }


  // search engine
  const handleSearchChange = (e) => {
    clearTimeout(seacrhTimeout);
    setSeacrhtext(e.target.value);

    //debouce method
    setseacrhTimeout(
      setTimeout(()=>{
        const searchResult = filterSearch(e.target.value);
        setsearchResults(searchResult);
      },500)
    )
  }

  return (
    <Layout title={'Products - Admin'}>
        <AdminMenu />

        <div className='bg-white flex-grow  rounded-lg 
            leading-relaxed text-xl font-bold my-8'>

            <h1 className='text-2xl text-primary mb-4'>Products</h1>

                <NavLink to='/dashboard/admin/create-products' className="text-base py-2 px-4 bg-gray-500 rounded-2xl  hover:bg-primary text-white">
                      Create Product
                </NavLink>

                <div className='mt-4 w-full flex gap-2'>
                      <input type="text" placeholder='search' value={seacrhtext} onChange={handleSearchChange} />  
                </div>

                {
                    seacrhtext ? (
                      <FeedCardList
                      data={searchResults}
                      getItems={getItems} 
                      />
                      ) : (
                        <FeedCardList data={products} getItems={getItems} />
                    )
                }

                <div className='w-full sm:max-w-[12rem]  mt-8'>
                      {/* {total} */}
                        {
                            getItems < total && products.length > 3 && (
                            <button className='px-4 py-2 rounded-2xl bg-primary text-white text-base' onClick={loadMoreHandler}>
                              Load more
                            </button>
                          )
                        }
                </div>
        </div>
    </Layout>
  )
}

export default Index