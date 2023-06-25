import  {useState,useEffect} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const useCategory = () => {
   const [categories, setcategories] = useState();
   //get cat
   const getCategory = async () => {
    try {
        const {data} = await axios.get(`/api/v1/category/get-category`);
        setcategories(data?.category)
    } catch (error) {
        console.log(error);
        toast.error("Something went error get category")
    }
   }
   
   useEffect(() => {
    getCategory();
   },[])

   return categories;
 
}

export default useCategory