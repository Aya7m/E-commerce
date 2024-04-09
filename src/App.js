

import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Wishlist from './Components/Wishlist/Wishlist'
import Catagory from './Components/Catagory/Catagory'
import Brands from './Components/Brands/Brands'
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import Notfound from './Components/Notfound/Notfound'
import Layout from './Components/Layout/Layout'
import AuthProvider from './Context/Auth/Auth'
import ProtectetRoute from './Components/Protectet/Protectet'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartcontextProvider from './Context/Cartcontext/Cartcontext'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment'
import AllOrder from './Components/AllOrder/AllOrder'
import Convertemail from './Components/Convertemail/Convertemail'


let quireClient = new QueryClient()

let router = createBrowserRouter([{
  path: "", element: <Layout />, children: [
    { index: true, element: <ProtectetRoute><Home /></ProtectetRoute> },
    { path: "cart", element: <ProtectetRoute><Cart /></ProtectetRoute> },
    { path: "products", element: <ProtectetRoute><Products /></ProtectetRoute> },
    { path: "productdetais/:id", element: <ProtectetRoute><ProductDetails /></ProtectetRoute> },
    { path: "wishlist", element: <ProtectetRoute><Wishlist /></ProtectetRoute> },
    { path: "catagory", element: <ProtectetRoute><Catagory /></ProtectetRoute> },
    { path: "brands", element: <ProtectetRoute><Brands /></ProtectetRoute> },
    { path: "allorder", element: <ProtectetRoute><AllOrder/></ProtectetRoute> },
    { path: "payment", element: <ProtectetRoute><Payment /></ProtectetRoute> },
    { path: "convert", element: <Convertemail/> },
    { path: "signup", element: <Signup /> },
    { path: "signin", element: <Signin /> },

    { path: "*", element: <Notfound /> },

  ]
}])

export default function App() {


  return (
    <>
      <QueryClientProvider client={quireClient} >
        <CartcontextProvider>
        <Toaster/>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CartcontextProvider>
      </QueryClientProvider>
    </>
  )
}

