import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {

  async function getAllBrand(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  let {data,isLoading}=useQuery("allBrands",getAllBrand)
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
    <div className="container py-5 text-center">
      <h1 className='text-main py-4 '>All Brands</h1>
      <div className="row">
        {data?.data.data.map((brand,ind)=><div key={ind} className="col-md-3 product shadow-sm py-3">
          <div className="inner">
            <img src={brand.image} className='w-100' alt="" />

            <h6>{brand.name}</h6>
          </div>
        </div> )}
        
      </div>
    </div>
    
    </>
  )
}
