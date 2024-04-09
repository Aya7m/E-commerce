import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg"
import { context } from '../../Context/Auth/Auth'
import { cartContext } from '../../Context/Cartcontext/Cartcontext'
export default function Navbar() {
  let navigat = useNavigate()
  let { tokn, setTokn } = useContext(context)
  function logOut() {
    setTokn(null)
    localStorage.removeItem("tkn");
    navigat("/signin")
  }
  let { numberOfProduct } = useContext(cartContext)

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="" />

          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {tokn ? <>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">Cart</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="wishlist">Wish List</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="Products">Products</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="catagory">Catagory</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="brands">Brands</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="allorder">All Order</Link>
                </li>

              </> : ""}






            </ul>


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-center align-items-center position-relative">





              {tokn ? <>
                <i className="fa-brands fa-youtube me-3"></i>
                <i class="fa-brands fa-twitter me-3"></i>
                <i class="fa-brands fa-tiktok me-3"></i>
                <i class="fa-brands fa-linkedin me-3"></i>
                <i class="fa-brands fa-facebook me-3"></i>

                <span className='position-absolute top-0 end-100 '>

                  <i className="fa-solid fa-cart-shopping me-3 fs-5 mt-2 ">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numberOfProduct}
                      <span class="visually-hidden">unread messages</span>
                    </span>


                  </i>

                </span>

                <li className="nav-item">
                  <span onClick={logOut} style={{ cursor: "pointer" }} className="nav-link " to="catagory">logOut</span>
                </li>


              </> : <>

                <li className="nav-item">
                  <Link className="nav-link" to="signup">SignUp</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="signin">SignIn</Link>
                </li>

              </>}








            </ul>



          </div>
        </div>
      </nav>

    </>
  )
}
