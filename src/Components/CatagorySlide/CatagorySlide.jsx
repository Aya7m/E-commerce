import React from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function CatagorySlide() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
    };
    async function getCatagorySlide(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
   

   let{data,isLoading}= useQuery("catagoryslid",getCatagorySlide)
    console.log(data?.data.data);
    if(isLoading==true){
        return  <div className='vh-100 d-flex justify-content-center align-items-center'>

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
           
                    <Slider {...settings} className='py-4'>
                        {data?.data.data.map((ele)=><div>
                            <img style={{ width: "100%", height: "200px" }} src={ele.image} alt="" className='w-100' />
                            <h5 className='text-main text-center'>{ele.name.split("").splice(0,5).join(" ")}</h5>
                        </div>)}
                        
                      


                    </Slider>

             


        </>
    )
}
