import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ColorRing } from 'react-loader-spinner'
import { context } from '../../Context/Auth/Auth';
export default function Signin() {
  const [errorMess, setErrorMess] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setloading] = useState(false)
  let nav = useNavigate()
  let { tokn, setTokn } = useContext(context)

  let User = {

    email: "",
    password: "",

  }
  let valid = Yup.object({

    email: Yup.string().required("the input is requird").email(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "enter valid email"),
    password: Yup.string().required("the input is requird").matches(/^[A-Z][a-z0-9]{3,8}$/, "enter valid password"),

  })
  async function sendData(value) {
    setloading(true)
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)



      if (data.message == "success") {
        setSuccess(data.message)
        localStorage.setItem("tkn", data.token)
        setTokn(data.token)
        setTimeout(function () {
          nav("/")
        }, 2000)

      }
    } catch (error) {
      console.log();
      setErrorMess(error.response.data.message)

    }

    setloading(false)

  }
  let formik = useFormik({ initialValues: User, onSubmit: sendData, validationSchema: valid })
  return (
    <>
      <div className='w-75 mx-auto' >
        {errorMess ? <div className='alert alert-success'>{errorMess}</div> : ""}
        {success ? <div className='alert alert-success'>{success}</div> : ""}

        <h2 className='my-5'>Login now :</h2>
        <form onSubmit={formik.handleSubmit} >



          <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mt-3' />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


          <label htmlFor="password">Password:</label>
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' className='form-control mt-3' />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}



          <div className='d-flex justify-content-between align-items-center'>
            <Link to={"/convert"} className='product:hover text-main ' style={{cursor:"pointer"}} >
                forget your password ?
                
            
              </Link>
            <button type='submit' className='btn btn-success my-4'>

              {loading ? <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /> : "Login Now"}



            </button>
          </div>





        </form>
      </div>




    </>
  )
}
