import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/Cartcontext/Cartcontext'
import { data } from 'jquery'
import { useNavigate } from 'react-router-dom'

export default function Payment() {
    let { cartid, setNumberOfProduct, setTotalPrice, setProducts } = useContext(cartContext)

    const [details, setDetails] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
let nav=useNavigate()

    async function cashPayment() {
       
        let formdata = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city,
            }


        }

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, formdata, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            if (data.status == "success") {
                setNumberOfProduct(0)
                setProducts([])
                setTotalPrice(0)
               

            }

            console.log(data);
        } catch (error) {
            console.log(error);

        }




    }


    async function onlinePayment() {
        let formdata = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city,
            }


        }

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`,
                formdata, {
                    headers: {
                        token: localStorage.getItem("tkn")
                    },
                params: {
                    url: "http://localhost:3000",
                }
            })

            if (data.status=="success"){
                window.open(data.session.url)
                
            }

                console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className='w-75 mx-auto my-5'>
               
                    <label htmlFor="details" className='mt-5'>Details :</label>
                    <input onChange={function (e) {
                        setDetails(e.target.value)
                    }} type="text" id='details' className='form-control' />


                    <label htmlFor="phone" className='mt-5'>Phone :</label>
                    <input onChange={function (e) {
                        setPhone(e.target.value)
                    }} type="tel" id='phone' className='form-control' />


                    <label htmlFor="city" className='mt-5'>City :</label>
                    <input onChange={function (e) {
                        setCity(e.target.value)

                    }} type="text" id='city' className='form-control' />

                    <button onClick={onlinePayment} className='btn btn-outline-info form-control my-5'>Pay Now Online</button>
                    <button onClick={cashPayment} className='btn btn-outline-info form-control '>Pay Now Cash</button>
                
            </div>

        </>
    )
}
