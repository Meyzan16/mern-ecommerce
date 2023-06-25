import React from 'react'

const CategoryForm = ({handleSubmit, value , setValue}) => {

  return (
    <>
             <form onSubmit={handleSubmit}>
              <div className='pb-4 md:pb-0 flex items-center gap-2 w-full md:max-w-sm'>
                <div className='w-full md:max-w-sm'>
                  <input type="text" placeholder='Create category' 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} />
                </div>
              
                <div>
                  <button className='btn-submit'> save </button>
                </div>
              </div>
            </form>


         
    </>
  )
}

export default CategoryForm