import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const Cart = () => {
  const [auth,setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();

  //todal price
  const totalPrice = () => {
    try {
        let total = 0 ;
          cart?.map((item) => 
          { 
              total= total  + item.price
          });
        return total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    } catch (error) {
      console.log(error);
        toast.error('Error while total price cart item');
    }
  }

  //delet item
  const removeCartItem = (pid) => {
    try {
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);

        //hapus juga di bagian local storage
        localStorage.setItem('cart',JSON.stringify(myCart));
        //end

    } catch (error) {
        console.log(error);
        toast.error('Error while removing cart item');
    }
  }
  return (
    <Layout>
        <div className='mb-8'>
            <h1 className='text-2xl text-primary mb-4'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>

            <div className='text-center text-lg text-primary'>
              {
                  cart?.length ? `You have ${cart?.length} items in your cart 
                  ${
                  auth?.token ? "" : "please login to checkout"    
                  }` :
                  "Your cart is empty"
              }

            </div>

            <div className='flex mt-4 gap-4'>
              <div className='md:w-4/5'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>  
                      {
                        cart?.map( (item,index) => (
                          <div key={index}> 
                                                        <div className="group  overflow-hidden hover:scale-95 transition-all duration-500  bg-gradient-to-r
                                                        from-cyan-500 to-blue-500 rounded-2xl flex mb-4 relative">
                                                
                                                            <img src={`/api/v1/product/photo-product/${item._id}`} 
                                                                className="group-hover:scale-125
                                                                group-hover:rotate-12
                                                                transition-all duration-500 aspect-square rounded-2xl object-cover" alt={item.name} />

                                                                <button onClick={(ev) =>  ev.preventDefault(navigate(`/product/${item.slug}`)) } className='cursor-pointer flex items-center text-xs 
                                                                  gap-2 absolute bottom-2 left-2 p-2 bg-slate-100 hover:bg-primary hover:text-white
                                                                  rounded-2xl shadow-md shadow-gray-500'>
                                                                  More Details
                                                                </button>

                                                                <button onClick={() => removeCartItem(item._id)} className='cursor-pointer flex items-center text-xs
                                                                  gap-2 absolute bottom-2 right-2 py-2 px-3 bg-slate-100 hover:bg-red-500 hover:text-white
                                                                    rounded-2xl shadow-md shadow-gray-500'>
                                                                    Remove
                                                                </button>
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
                                                            </span>
                                                        
                                                        </div>
                                                                    
                                                                                    
                                                                    
                                                    </div>   
                        ))
                      }
                  </div>
              </div>

              <div className='md:w-1/5'>
                  <div className='bg-primary text-center text-base text-white font-sans rounded-lg'>
                      <div>
                        Total Summary
                      </div>
                      <p className='border-b-2'> Total | chechout | payment </p>
                      <div>
                        Total : {totalPrice()}
                      </div>
                  </div>
              </div>

            </div>
               
        </div>
    </Layout>
  )
}

export default Cart
