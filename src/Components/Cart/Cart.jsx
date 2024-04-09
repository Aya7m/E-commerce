import React, { useContext } from 'react'
import { cartContext } from '../../Context/Cartcontext/Cartcontext'
import { ColorRing } from 'react-loader-spinner'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toast } from 'bootstrap'
import { date } from 'yup'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  let {UpdateProduct, numberOfProduct, totalPrice, products,removeItem ,clearCart} = useContext(cartContext)

  if(products==null){
    return <>
    
    <div className='vh-100 d-flex justify-content-center align-items-center'>

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
    </>
  }

  if(products.length==0){
    return <>
    
    <div className='vh-100 d-flex justify-content-center align-items-center'>

   <h1>No Data To Display</h1>
    </div>
    </>
  }



 async function update(id,count){

     const data=await UpdateProduct(id,count)
   if(data.status=="success"){
    toast.success("product update",{
      duration:2000,
      position:"top-right",
    })
    
   
   }else{
    toast.error("error", {
      duration: 2000,
      position: "top-right",
  })
   }
  
   

    
   
   
  }

 async function clearAll(){
   await clearCart()
  }



  return (
    <>
      <div className='container py-5 mt-5 border-bottom border-1 pb-3' style={{ background: "#eee" }}>


        <h2>Cart Shop</h2>
        <div className='d-flex justify-content-between mt-5 mb-5'>
          <h3>Total Price: {totalPrice}</h3>
          <h3>Total Number Of Item :{numberOfProduct}</h3>
           <Link  className='btn btn-info' to="/payment">
            
            Chick Out
            
            </Link>
        </div>

       

        {products.map((ele, idx) => <div key={idx} className="row">
          <div className="col-md-3">
            <img src={ele.product.imageCover}

              className='w-100' alt="" />
          </div>
          <div className="col-md-7">
            <h4>{ele.product.title}</h4>

            <h4>{ele.price} EGP</h4>
            <span style={{cursor:"pointer"}} onClick={function(){
              removeItem(ele.product._id)
            }}>
            <i class="fa-solid fa-trash text-danger"></i>
            Remove
            </span>



          </div>
          <div className="col-md-2">
            <div className='d-flex align-items-center my-5 mx-3'>
              <button onClick={function(){
             update(ele.product._id,ele.count+1)
              }} className='btn btn-outline-info'>+</button>
              <h4 className='mt-2'>{ele.count}</h4>


              {ele.count<=0?  <button onClick={function(){
               update(ele.product._id,ele.count-1)
              }}
               className='btn btn-outline-info'>-</button>: <button onClick={function(){
                removeItem(ele.product._id)
                 }} className='btn btn-outline-info'>-</button> }
                


            
            </div>

          </div>
        </div>)}
        <button onClick={clearAll} className='btn btn-outline-warning form-control mx-auto text-dark mt-5'>Clear All</button>


      </div>


    </>
  )
}
