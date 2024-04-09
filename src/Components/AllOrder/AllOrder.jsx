
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';

export default function AllOrder() {
    let userId = jwtDecode(localStorage.getItem("tkn")).id;
    const [alldata, setAlldata] = useState(null)
    async function getAllorder() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            setAlldata(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(userId);



    useEffect(function () {
        getAllorder()
    }, [])

    return (
        <>

            <div className="container my-5 py-3">
                <div className="row g-3">
                    {alldata ? alldata.map((order, idx) => <div key={idx} className="col-md-6">
                        <div className="inner bg-info-subtle rounded-1 p-3">
                            <p>payment Method :{order.paymentMethodType}</p>
                            <p>Phone :{order.shippingAddress.phone}</p>
                            <p>City :{order.shippingAddress.city}</p>

                            <div className="row">
                                {order.cartItems.map((item) => <div className="col-md-4">
                                    <div>
                                        <img src={item.product.imageCover} className='w-100' alt="" />

                                        <h6>{item.product.title.split(" ").splice(0,2).join("")}</h6>


                                    </div>
                                </div>)}

                            </div>

                        </div>



                    </div>) : <div className='vh-100 d-flex justify-content-center align-items-center'>

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



                </div>


            </div>



        </>
    )
}
