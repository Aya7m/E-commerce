import axios from 'axios'
import React, { useEffect } from 'react'
import { date } from 'yup'

export default function Wishlist() {

  useEffect(function(){
    getwishList()
  },[])
 async function getwishList(){
  try {
     let{data}= await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
      headers:{
        token:localStorage.getItem("tkn")
      }
    })
    console.log(data);
  return date
  } catch (error) {
    console.log(error);
  }  
  }
 
  return (
    <>
      <div className='container my-5' style={{background:"#eee"}}>
        <h1 className=' mt-5 py-5' style={{}}>my wish list</h1>

        



    </div>
    </>
  
  )
}
