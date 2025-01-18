import React, { useContext, useEffect, useState } from 'react';
import freshCartLogo from '../../assets/imgs/freshcart-logo.svg';
import { NavLink } from 'react-router-dom';
import { userContext } from './../../context/UserContext/User.context';
import { CartContext } from '../../context/CartContext/Cart.Context';

export default function Navbar() {

  const { token, logOut } = useContext(userContext)
  const {cartInfo,wishListDetails,getLoggedWishList, getCartProducts} = useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(()=>{
    getCartProducts(),
    getLoggedWishList()
  },[])

  return (
    <>
      <nav className={`bg-slate-100  shadow py-3 z-50 ${isMenuOpen ? 'fixed' : 'fixed'} top-0 w-full`}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="#">
            <img className='ml-5 w-full' src={freshCartLogo} alt="FreshCart Logo" />
          </a>

          {/* Toggler Button */}
          <button
            className="lg:hidden text-primary-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} mr-5 text-2xl`}></i>
          </button>

          {/* Links and Other Content */}
          <div
            className={`${isMenuOpen ? 'block' : 'hidden'
              } lg:flex flex-col lg:flex-row lg:gap-12 items-center lg:static absolute top-full left-0 w-full bg-slate-100 lg:bg-transparent shadow-lg lg:shadow-none`}
          >

            {token && <>
              {/* Links */}
              <ul className="flex flex-col mx-auto lg:flex-row gap-5 items-center lg:gap-12 p-4 lg:p-0">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              {/* Cart Icon */}
                <NavLink to="/cart"  className={({ isActive }) =>
                      `relative before:absolute before:w-0 cursor-pointer before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }>
                <i className="fa-solid fa-cart-shopping  text-lg"></i>
                <div className="cartCount flex justify-center items-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-primary-800 text-white text-xs">
                  {cartInfo == null? <i className='fa-solid fa-spinner fa-spin'></i> :
                  <span className='text-sm font-semibold'>
                    {cartInfo.numOfCartItems}
                  </span> }
                </div>
              </NavLink>
              {/* Wishlist Icon */}
              <NavLink to="/wishlist"  className={({ isActive }) =>
                      `relative before:absolute before:w-0 cursor-pointer before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }>
                <i className="fa-solid fa-heart  text-lg"></i>
                <div className="cartCount flex justify-center items-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-primary-800 text-white text-xs">
                  {cartInfo == null? <i className='fa-solid fa-spinner fa-spin'></i> :
                  <span className='text-sm font-semibold'>
                    {wishListDetails?.length}
                  </span> }
                </div>
              </NavLink>
              </ul>
              
            </>}


            {/* Social Media Icons */}
            <ul className={`flex gap-5 justify-center items-center p-4 lg:p-0 ${!token && "ms-auto"}`}>

              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-facebook text-xl text-blue-600"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-instagram text-xl text-pink-500"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-twitter text-xl text-blue-400"></i>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-tiktok text-xl text-black"></i>
                </a>
              </li>

            </ul>

            {/* Authentication */}
            <ul className={`flex gap-5 justify-center items-center p-4 lg:p-0 ${!token && "ms-auto"}`}>

              {!token && <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>}

              {token && <>
                <li onClick={logOut}>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }
                    to="/logout"
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg text-red-700"></i>
                  </NavLink>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>

      {/* Adjust for Navbar Height */}
      <div className="h-[50px]"></div>
    </>
  );
}
