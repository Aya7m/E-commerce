
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Convertemail() {
let {data,isLoading}=useQuery("vert",vertifyEmail)

    function vertifyEmail() {



    }
    if(isLoading?<div className='vh-100 d-flex justify-content-center align-items-center'>

    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  </div>: <input type="email" id='email' className='form-control w-100 mx-auto ' placeholder='code' />)
    return (
        <>
            <div className="container mt-5">
                <form onSubmit={vertifyEmail} >

                    <h1 className='mt-5 py-5'>please enter your verification code</h1>
                    <input type="email" id='email' className='form-control w-100 mx-auto ' placeholder='email' />
                    <button className='btn btn-success my-4'>verify</button>
                </form>

            </div>

        </>
    )
}
