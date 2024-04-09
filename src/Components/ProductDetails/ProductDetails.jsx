
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ColorRing, FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/Cartcontext/Cartcontext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
    const [load, setLoad] = useState(false)
    let { id } = useParams();

    let { addTocart } = useContext(cartContext);

    async function addProduct(id) {
        setLoad(true)
        const res = await addTocart(id);
        console.log(res);
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
        setLoad(false)
    }


    async function getProductdetails() {

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }


    let { data, isLoading } = useQuery("productdetails", getProductdetails)
    // console.log(data?.data.data);

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
                <div className="row mt-5 justify-content-center align-items-center">
                    <div className="col-md-4">
                        <img src={data?.data.data.imageCover} className='w-100' alt="" />

                    </div>
                    <div className="col-md-8">
                        <h5 className='my-3 text-main'>{data?.data.data.title}</h5>
                        <h6 className='my-3'>{data?.data.data.description}</h6>

                        <div className='d-flex justify-content-between align-items-center'>
                            <p>{data?.data.data.price}EGP</p>

                            <p><span></span><i className='fa fa-star text-warning'></i>{data?.data.data.ratingsAverage}</p>
                            <p>{data?.data.data.id}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>



                            <button onClick={function () {
                                addProduct(data?.data.data.id)
                            }}

                                className='w-100  btn btn-success mx-3'>
                                {load ? <FallingLines
                                    color="#4fa94d"
                                    width="30"
                                    visible={true}
                                    ariaLabel="falling-circles-loading"
                                /> : "Add To Cart"}


                            </button>
                            <i className='fa fa-heart my-5'></i>
                        </div>



                    </div>
                </div>
            </div>

        </>
    )
}
