import React,{useState, useEffect} from 'react'
import Layout from '../../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../../components/layout/AdminMenu';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const {Option} = Select;

const Edit = () => {
    const navigate = useNavigate();
    const {slug} = useParams();

    const [categories, setcategories] = useState([]);
    const [name,setname] = useState("");
    const [description,setdescription] = useState("");
    const [price,setprice] = useState("");
    const [category,setcategory] = useState("");
    const [quantity,setquantity] = useState("");
    const [shipping,setshipping] = useState("");
    const [photo,setphoto] = useState("");
    const [id,setid] = useState("");
   
    //get single product 
    
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${slug}`)
            setid(data?.products?._id)
            setname(data?.products?.name)
            setdescription(data?.products?.description)
            setprice(data?.products?.price)
            setquantity(data?.products?.quantity)
            setcategory(data?.products?.category._id);
            setshipping(data?.products?.shipping);

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in get single product')
        }
    }
    useEffect(()=>{
        getSingleProduct();
        //eslint disable next line
    }, []);

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

  useEffect(()=> {
    getAllCategories();
  }, []);
    

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);

   
      if(data?.success){
        toast.success(data?.message)
        navigate('/dashboard/admin/products');
      }else{
        toast.error(data?.message);
      }

    } catch (error) {
      console.log(error)
      toast.error("semething went error update ")
    }

  }

  const handleDelete = async (ev) => {
    try {
      let answer = window.prompt('Are you sure want to delete this product ? ');
      if(!answer) return;
      
      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success(data?.message);
      navigate('/dashboard/admin/products');
    } catch (error) {
      console.log(error)
      toast.error("semething went error delete ")
    }
  }


  return (
    <Layout title={'Products New - Admin'}>
        <AdminMenu />

        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6
        leading-relaxed text-xl font-bold border-l-4
        border-solid border-teal-500 shadow-lg mt-6 mb-6'>
            <h1 className='text-2xl text-primary mb-4'>Edit Product</h1>


            <div className='w-full md:px-32 '>

                <div>
                    <Select bordered={false} placeholder="Select a category" showSearch 
                      className='form-select  mb-3' onChange={(value) => {setcategory(value)}}
                      value={category}
                      >
                      {
                        categories?.map(item => (
                          <Option key={item._id} value={item._id}>
                            {item.name}
                          </Option>
                        ))
                      }
                    </Select>
                </div>
            
                <div className='mb-4'>
                  <label className='block w-full border-2 px-2 py-1.5 text-secondary
                          shadow-sm ring-inset ring-primary placeholder:text-gray-400
                          sm:text-sm sm:leading-6 rounded-2xl border-primary
                          focus:outline-none focus:border-primary focus:ring-primary focus:ring-1'>
                        {photo ? photo.name : "Upload photo" } 
                          <input type="file" className='hidden' name='photo' accept='image/*' 
                          onChange={(e)=> setphoto(e.target.files[0])} />
                  </label>
                </div>

                <div> 
                    {
                      photo ? (
                        <div className='mb-3 flex h-40 justify-center relative'> 
                          <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="rounded-2xl object-cover" />
                        </div>
                      ):(
                        <div className='mb-3 flex h-40 justify-center relative'> 
                          <img src={`/api/v1/product/photo-product/${id}`} alt="product_photo" 
                          height={"200px"} className="rounded-2xl object-cover" />
                        </div>

                      )
                    }
                </div>

                <div className='mb-4'> 
                    <input type="text" value={name} placeholder="write a name" onChange={(e)=> setname(e.target.value)}/>
                </div>

                <div className='mb-4'> 
                    <textarea className='text-base font-medium' value={description} placeholder="write a description" onChange={(e)=> setdescription(e.target.value)}/>
                </div>

                <div className='mb-4'> 
                    <input type="number" value={price} placeholder="write a price" onChange={(e)=> setprice(e.target.value)}/>
                </div>

                <div className='mb-4'> 
                    <input type="number" value={quantity} placeholder="write a quantity" onChange={(e)=> setquantity(e.target.value)}/>
                </div>

                <div>
                    <Select bordered={false} placeholder="Select a shipping" showSearch 
                      className='form-select  mb-3' onChange={(value) => {setshipping(value)}}
                      value={shipping === 0 ? "No" : "Yes"}>
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                    </Select>
                </div>

                <div className='flex gap-2 '>
                  <button className='btn-edit' onClick={handleUpdate} >
                      update
                  </button>
                  <button className='btn-delete' onClick={handleDelete} >
                      delete
                  </button>
                </div>

               
            </div>
     
        </div>
    </Layout>
  )
  
}

export default Edit