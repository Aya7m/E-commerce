import axios from "axios";
import { data } from "jquery";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import { date } from "yup";

export let cartContext=createContext()




export default function CartcontextProvider({children}) {
  const [numberOfProduct, setNumberOfProduct] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [products, setProducts] = useState(null)
  const [cartid, setCartid] = useState("")

      useEffect(() => {
     getUserCart()


    }, [])
   async function addTocart(productId){
    try {
       let{data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
     
     {
        productId: productId
    },{
        headers:{
            token:localStorage.getItem("tkn")
        }
    }) 
    if(data.status=="success"){
      // setNumberOfProduct(data.
      //   numOfCartItems)
      // setTotalPrice(data.data.totalCartPrice)
      // // setProducts()
      getUserCart()
    }
    return data
   
    } catch (error) {
        console.log(error);
        
    }
    

    }

    async function getUserCart(){
      try {
        let{data}  =await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
          token:localStorage.getItem("tkn")
        }
      })
      
      if(data.status=="success"){
        setNumberOfProduct(data.numOfCartItems)
        setTotalPrice(data.data.totalCartPrice)
        setProducts(data.data.products )
        setCartid(data.data._id)
         
          
          
      }
      console.log(data,"cartuser");
       return data
     
      } catch (error) {
        console.log(error);
        
      }
   
    }

   async function removeItem(id){
    try {
       let{data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{
      token:localStorage.getItem("tkn")
    } })
    if(data.status=="success"){
      setNumberOfProduct(data.numOfCartItems)
      setTotalPrice(data.data.totalCartPrice)
      setProducts(data.data.products )
       
        
        
    }
    console.log(data,"delet");
     return data
  
    } catch (error) {
      console.log("error");
      
    }
  
    }

    async function UpdateProduct(id,count){
      try {
       let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{
          headers:{
            token:localStorage.getItem("tkn")
          }
        })
        if(data.status=="success"){
          setNumberOfProduct(data.numOfCartItems)
          setTotalPrice(data.data.totalCartPrice)
          setProducts(data.data.products )
           
            
            
        }

        return date
       

        
      } catch (error) {
        console.log("errpr");
        
      }
    }
    

    async function clearCart(){
      try {
         let{data}  = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
          token:localStorage.getItem("tkn")
        }
      })
      if(data.message=="success"){
        setNumberOfProduct(0)
        setTotalPrice(0)
        setProducts([])
         
          
          
      }
      return data
      } catch (error) {
        console.log("error");
      }
   
    }
  

  return (
    <>
    <cartContext.Provider value={{UpdateProduct,removeItem,addTocart,numberOfProduct,totalPrice,products,clearCart,cartid,setNumberOfProduct,setTotalPrice,setProducts}}>
    {children}
    </cartContext.Provider>
    </>
  )
}
