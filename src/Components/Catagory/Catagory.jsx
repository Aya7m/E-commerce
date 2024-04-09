import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Catagory() {


  async function getAllCatagory(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data,isLoading}=useQuery("allCatago",getAllCatagory)
  console.log(data?.data.data);
  if(isLoading==true){
    return <div className='vh-100 d-flex justify-content-center align-items-center'>

    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  </div>
  }

  return (
    <>
    
    <div className="container py-5">
      <div className="row">
        {data?.data.data.map((ele,idx)=><div key={idx} className="col-md-4 product shadow py-4 ">
          <div className="inner">
            <img src={ele.image} className='w-100' alt="" />

            <h3 className='text-main fs-3 py-3 text-center'>{ele.name}</h3>

          </div>
        </div> )}
        
      </div>
    </div>
    
    
    
    </>
  )
}
