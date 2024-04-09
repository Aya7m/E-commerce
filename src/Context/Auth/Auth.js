import { createContext, useEffect, useState } from "react";
import React from 'react'

 export let context = createContext()




export default function AuthProvider({ children }) {
    
    const [tokn, setTokn] = useState(null)

    useEffect(function(){

        if(localStorage.getItem("tkn")!=null){
            setTokn(localStorage.getItem("tkn"))
        }
    },[])
    console.log(tokn);

    return (
        <>
            <context.Provider value={{tokn,setTokn}}>

                {children}
            </context.Provider>

        </>
    )
}
