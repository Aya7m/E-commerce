import axios from 'axios'
import { data } from 'jquery';
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/Cartcontext/Cartcontext';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function Products() {



  const [product, setProduct] = useState(null)
  const [load, setLoad] = useState(false)
  let { id } = useParams();
  let { addTocart } = useContext(cartContext);

  useEffect(function(){
    getProduct()
  },[])
  
  async function getProduct(){
    
    try {
      let{data} =await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      console.log(data.data,"getpro");
     setProduct(data.data)

    
      return data
    } catch (error) {
      console.log(error);
    }
   
  }





 

  
  // if(load==true ) {return <div className='vh-100 d-flex justify-content-center align-items-center'>

  //   <ColorRing
  //     visible={true}
  //     height="80"
  //     width="80"
  //     ariaLabel="color-ring-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="color-ring-wrapper"
  //     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //   />
  // </div>}
    
  
  return (
    <>
    <div className="container mt-5 py-5">
      <input type="text" className='form-control w-75 mx-auto mt-5 my-3'  placeholder='search'/>
      <div className="row">
        {product?.map((ele)=> <div className="col-md-3 ">
          <div className="inner product p-3 ">
            <img src={ele.imageCover} className='w-100' alt="" />

            <p className='text-main'>{ele.title.split("").splice(0,5).join("")}</p>

            <h6>{ele.description.split("").splice(0,8).join("")}</h6>
            <div className='d-flex justify-content-between align-items-center'>
              <p>{ele.price} EGP</p>
              <div className='d-flex'>
                <p>{ele.ratingsAverage}</p>
                <i className='fa fa-star text-warning'></i>

              </div>
           </div>   
              <div className='d-flex justify-content-between align-items-center my-3'>
                <button  className='btn btn-success form-control w-75'>+Add</button>
                <i className='fa fa-heart'></i>
              </div>
            

          
          </div>
        </div>)}
      
        
      </div>
    </div>
    
    </>
  )
}
