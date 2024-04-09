import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ColorRing } from 'react-loader-spinner'
export default function Signup() {
  const [errorMess, setErrorMess] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setloading] = useState(false)
  let nav = useNavigate()

  let User = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  let valid = Yup.object({
    name: Yup.string().required("the input is requird").min(3, "min length is 3 char").max(10, "max length is 10 char"),
    email: Yup.string().required("the input is requird").email(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "enter valid email"),
    password: Yup.string().required("the input is requird").matches(/^[A-Z][a-z0-9]{3,8}$/, "enter valid password"),
    rePassword: Yup.string().required("the input is requird").oneOf([Yup.ref("password")], "enter same password"),
    phone: Yup.string().required("the input is requird").matches(/^01[0125][0-9]{8}$/, "enter EG phone")

  })
  async function sendData(value) {
    setloading(true)
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)



      if (data.message == "success") {
        setSuccess("ro7 login")
        setTimeout(function () {
          nav("/signin")
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

        <h2 className='my-5'>register now :</h2>
        <form onSubmit={formik.handleSubmit} >

          <label htmlFor="name">Name:</label>
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' className='form-control mt-3' />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}


          <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mt-3' />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


          <label htmlFor="password">Password:</label>
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' className='form-control mt-3' />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


          <label htmlFor="repassword">Re-password:</label>
          <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' className='form-control mt-3' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}


          <label htmlFor="phone">Phone:</label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='phone' className='form-control mt-3' />
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}


          <button type='submit' className='btn btn-success my-4'>

            {loading? <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />:"Submit"}

           

            </button>



        </form>
      </div>




    </>
  )
}
