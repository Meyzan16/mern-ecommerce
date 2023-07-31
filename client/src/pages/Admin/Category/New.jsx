import React,{useEffect,useState} from 'react'
import Layout from '../../../components/layout/Layout';
import AdminMenu from '../../../components/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../../components/Form/CategoryForm';
import { Modal } from 'antd';

const New = () => {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState();
  const [visible, setVisible] = useState(false);

  //selected edit modal
  const[selected,setSelected] = useState(null);
  const[updatedName, setUpdatedName] = useState('');


  //handleSubmit
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try{
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if(data?.success){
        toast.success(`${name} is cretaed`)
        getAllCategories();
      }else{
        toast.error(data?.message);
      }

    }catch(error){
      console.log(error);
      toast.error("Something went error in input form");
    }
  }


  //pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = categories.slice(firstIndex, lastIndex);

  const npage = Math.ceil(categories.length / recordsPerPage)
  const numbers = [...Array(npage+1).keys()].slice(1)

  //handle update
  const handleUpdate = async (ev) => {
    ev.preventDefault();
    try{
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data?.success){
        toast.success(`${updatedName} is updated `)
        setSelected(null)
        setUpdatedName("")
        setVisible(false);
        getAllCategories();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went error");
    }
  }

  //handle delete
  const handleDelete = async (id) => {
    try{
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`,)
      if(data?.success){
        toast.success(data.message);
        getAllCategories();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went error");
    }
  }



  //get all categories
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category');
      if(data?.success){
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  useEffect(()=> {
    getAllCategories();
  }, []); 



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
    <Layout title={'Category - Admin'}>
        <AdminMenu />

        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6
          leading-relaxed text-xl font-bold border-l-4
          border-solid border-teal-500 shadow-lg mt-6'>
          <h1 className='text-2xl text-primary'>Category</h1>

          <div className='mt-6 text-base font-normal'>
            
            <div className='md:flex  items-center gap-2 w-full justify-between pb-4 '>
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              
                <div className="w-full md:max-w-sm">
                  <input type="text" placeholder="Search for items" />
                </div>
            </div>

            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
              <table className="basic">
                <thead>
                  <tr>
                    <th scope="col">
                      Category name
                    </th>
                    <th scope="col">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                    {
                      records?.map((item) => 
                            <tr key={item._id}>
                                    <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                      {item.name}
                                    </td>

                                    <td>
                                     <button className='btn-edit' onClick={() => 
                                      {
                                        setVisible(true); 
                                        setUpdatedName(item.name);
                                        setSelected(item); 
                                      }}
                                      >
                                        edit
                                     </button>

                                     <button className='btn-delete' onClick={()=> handleDelete(item._id)}>
                                        delete
                                     </button>
                                    </td>
                                  
                            </tr>
                      )
                    }
                   
                </tbody>
              </table>
            </div>

              <nav className='mt-8'>
                <ul className="inline-flex -space-x-px">
                  <li>
                    <div  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg" onClick={prePage}>Previous</div>
                  </li>
                  {
                    numbers.map((n,i) => (
                      <li key={i}>
                        <div  className={`px-3 py-2 border text-gray-500 border-gray-300  ${currentPage === n ? 'bg-blue-600 text-white' : ''} `}
                        onClick={() => changeCPage(n)}> {n} </div>
                      </li>
                    ))
                  }
                
                  <li>
                    <div className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg" onClick={nextPage} >
                      Next
                    </div>
                  </li>

                </ul>
              </nav>
          </div>


            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <div className='py-4'>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>

              </div>
            </Modal>


        </div>
    </Layout>
  )
}

export default New