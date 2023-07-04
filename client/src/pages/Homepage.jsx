import React,{useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import Feedcard from '../components/Form/Feedcard';


const FeedCardList = ({data}) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        {
          data?.map((item) => (
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

const Homepage = () => {



  const [products,setproducts] = useState([]);
  const [categories,setcategories] = useState([]);
  const [checked,setchecked] = useState([]);
  const [radio,setradio] = useState([]);


  const [seacrhtext, setSeacrhtext] = useState('');
  const [seacrhTimeout, setseacrhTimeout] =  useState(null);
  const [searchResults, setsearchResults] =  useState([]);


  //pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);

  const npage = Math.ceil(products.length / recordsPerPage)
  const numbers = [...Array(npage+1).keys()].slice(1)

  
  const filterSearch = (seacrhtext) => {
    const regex = new RegExp(seacrhtext, "i"); // "i" flag for case-insensitive search
    return products.filter(
      (item) => 
        regex.test(item.name) ||
        regex.test(item.description)
    );
  }

  //get all categories
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category');
      if(data?.success){
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  useEffect (()=> {
    getAllCategories();
  },[]);


  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/get-product`);
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting products')
    }
  }




  //filter by category khsus check
  const handleFilter = (value,id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(item => item!== id)
    }
    setchecked(all);
  };

  useEffect(()=> {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(()=> {
    if(checked.length || radio.length) filterProducts();
  }, [checked,radio]);

  // get filters setelah di checked
  const filterProducts = async () => {
    try {
      const { data }  = await axios.post('/api/v1/product/filters-product',{checked,radio});
      setproducts(data?.products);
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in filtered produts')
    }
  }

  //serach engine
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

  
  function prePage(){
      if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
      }
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage () {
    if(currentPage !== npage){
        setCurrentPage(currentPage + 1);
    }
  }


  return (
    <Layout title={'Best offers'} >
            <div className='w-full flex gap-2'>
                  <input type="text" placeholder='search' value={seacrhtext} onChange={handleSearchChange} />
            </div>

            <div className='md:flex md:gap-2 my-6'>

                <div className='md:w-1/5  mb-4 '>
                  <div className='mb-4'>
                      <h1>Filtered by category</h1>
                      <div className='flex flex-col'>
                        {
                          categories?.map((item) => (
                            <Checkbox key={item._id} onChange={(e) => handleFilter(e.target.checked,item._id)}>
                              {item.name}
                            </Checkbox>
                          ))
                        }
                      </div>
                  </div>

                  <div className='mb-4'>
                      <h1>Filtered by price</h1>
                        <div className='flex flex-col'>
                            <Radio.Group onChange={e => setradio(e.target.value)}>
                              {
                                Prices?.map((item) => (
                                  <div key={item._id}>
                                    <Radio value={item.array}>
                                      {item.name}
                                    </Radio>
                                  </div>
                                    )
                                )
                              }
                            </Radio.Group>
                        </div>

                        <div className='mt-2'>
                            <button className='btn-delete' onClick={() => window.location.reload()}>
                              Riset Filters
                            </button>
                        </div>
                  </div>
                </div>

                <div className='md:w-4/5'>
                  
                  {
                 
                          seacrhtext ? (
                            <FeedCardList
                            data={searchResults}
                            />
                            ) : (
                            <FeedCardList data={records}  />
                          )
                  
                  }

                  
                    <nav className='mt-8'>
                      <ul className="inline-flex -space-x-px">
                        <li>
                          <div  className="cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg" onClick={prePage}>Previous</div>
                        </li>
                        
                        {
                          numbers.map((n,i) => (
                            <li key={i}>
                              <div  className={`cursor-pointer px-3 py-2 border text-gray-500 border-gray-300  ${currentPage === n ? 'bg-blue-600 text-white' : ''} `}
                              onClick={() => changeCPage(n)}> {n} </div>
                            </li>
                          ))
                        }
                      
                        <li>
                          <div  className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg" onClick={nextPage} >
                            Next
                          </div>
                        </li>

                      </ul>
                    </nav>
                
                 
                </div>


            </div>


    </Layout>
  )
}

export default Homepage