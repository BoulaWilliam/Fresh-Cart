import React, { useContext, useEffect } from 'react'
import Loading from './../../Components/Loading/Loading';
import { CartContext } from '../../context/CartContext/Cart.Context';
import CartItem from '../../Components/CartItem/CartItem';
import { Link, NavLink } from 'react-router-dom';

export default function Cart() {

    let { getCartProducts, cartInfo, clearCart } = useContext(CartContext)

    useEffect(() => {
        getCartProducts()
    }, [])

    return (
        <>
            {cartInfo == null ? <Loading /> :
                <section>
                    <div className='flex gap-8 items-center'>
                        <i className='text-3xl fa-brands fa-opencart'></i>
                        <h2 className='text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:-left-1 before:top-1/2 before:-translate-y-1/2 before:bg-slate-600'> Your Shopping Cart</h2>
                    </div>
                    {cartInfo.numOfCartItems == 0 ?
                        <div className='flex flex-col gap-3 justify-center items-center mt-6 bg-gray-100 p-5 rounded-md shadow'>
                            <h2>Oops!  Your Cart Is Empty. Start Shopping Now By Clicking The
                                Button Below And Find Something You Love!
                            </h2>
                            <NavLink to='/' className='btn bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-white'>Back To Home</NavLink>
                        </div> :
                        <>
                            <div className='space-y-4 mt-6'>
                                {cartInfo?.data?.products.map((product) => <CartItem key={product._id} productInfo={product} />)}
                            </div>
                            <div className='mt-5 flex justify-between items-center'>
                                <p className='text-xl'>
                                    <i className='fa-solid fa-sack-dollar text-xl mr-2 text-primary-800'></i>
                                    Your Total Order Price = <span className='text-primary-800 font-bold'> {cartInfo?.data?.totalCartPrice}</span> </p>

                                <button onClick={clearCart} className='btn bg-red-500 hover:bg-red-700 transition-colors duration-300'>
                                    <i className='fa-solid fa-trash text-xl mr-2'></i>
                                    Clear Cart</button>
                            </div>
                            <NavLink
                                to={`/checkout`}
                                className='btn text-center mt-10 bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-white w-full block'
                            >
                                Next Step
                            </NavLink>

                        </>

                    }
                </section>
            }
        </>
    )
}
