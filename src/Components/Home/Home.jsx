import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing, FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CatagorySlide from '../CatagorySlide/CatagorySlide';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/Cartcontext/Cartcontext';
import toast from 'react-hot-toast';

export default function Home() {
  let { addTocart } = useContext(cartContext);
  

  async function getProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let { data, isLoading } = useQuery("allProduct", getProduct)
  console.log(data?.data.data);


  async function addProduct(id) {
    
    const res = await addTocart(id);
    // console.log(res);
    if (res.status == "success") {
      // console.log(res.message,"product add to cart");
      toast.success(res.message, {
        duration: 2000,
        position: "top-right"
      })
    } else {
      toast.error("error", {
        duration: 2000,
        position: "top-right"
      })

    }
    
  }



  // const [allProduct, setAllProduct] = useState(null)

  // async function getProduct() {
  //   let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //   console.log(data.data);
  //   setAllProduct(data.data);

  // }
  // useEffect(function () {
  //   getProduct()
  // }, [])

  if (isLoading == true) {
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
        <HomeSlider />
        <CatagorySlide />
        <input type="text" className='w-75 mx-auto form-control mt-5 my-5' placeholder='search' />
        <div className="row">

          {data?.data.data?.map((product, idx) => <div key={idx} className="col-md-2">
            <Link to={`/productdetais/` + product._id}>

              <img src={product.imageCover} className='w-100' alt="" />

              <h6 className='text-main my-2'>{product.title.split("").slice(0, 5).join(" ")}</h6>

              <h5>{product.category.name}</h5>
              <div className='d-flex justify-content-between align-items-center'>
                <p>price :{product.price}EGP</p>
                <p><span><i className='fa-solid fa-star text-warning '></i>{product.ratingsAverage}</span></p>

              </div>





            </Link>
            <button onClick={function () {
              addProduct(product._id)
            }} className='w-100  btn btn-success mx-3 my-5'>
               Add To Cart

              

            </button>
          </div>)}
        </div>
      </div>
      {/* {allProduct?<div className="container py-5">
        <div className="row">
          {allProduct ? allProduct.map((product, idx) => <div key={idx} className="col-md-2">
            <div className="inner">
              <img src={product.imageCover} className='w-100' alt="" />

              <h6 className='text-main my-2'>{product.title.split("").slice(0, 5).join(" ")}</h6>

              <h5>{product.category.name}</h5>
              <div className='d-flex justify-content-between align-items-center'>
                <p>price :{product.price}EGP</p>
                <p><span><i className='fa-solid fa-star text-warning '></i>{product.ratingsAverage}</span></p>
              </div>





            </div>
          </div>) : ""}
        </div>
      </div>: <div className='vh-100 d-flex justify-content-center align-items-center'>

        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>}
      */}




    </>
  )
}
