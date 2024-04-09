
import React, { useContext } from 'react'
import { context } from '../../Context/Auth/Auth'
import { Navigate } from 'react-router-dom'

export default function ProtectetRoute({children}) {
   let{tokn}= useContext(context)
   if(tokn==null){
    return <Navigate to="/signin"/>
   }
  return (


    <>
    {children}
    </>
  )
}
