import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext/Cart.Context';
import { NavLink } from 'react-router-dom';

export default function CartItem({ productInfo }) {
    const { count, price, product } = productInfo;
    const { title, imageCover, category, id } = product
    let { removeProductFromCart, updateProductCount } = useContext(CartContext)
    return (
        <>
            <div className="flex justify-center items-center gap-2">
                <div className="cart-item grow flex justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
                    <img src={imageCover} className='w-24 h-24 rounded-full border-white object-cover' alt={title} />
                    <h3 className='text-lg text-gray-700 font-semibold'>
                        <NavLink to={`/productDetails/${id}`}>
                        {title}
                        </NavLink>
                    </h3>
                    <h4 className='text-lg text-gray-500 font-semibold'>{category.name}</h4>

                    <div className="count flex gap-5 items-center">
                        <span className='text-xl font-semibold text-gray-700'>{count}</span>
                        <div className="icons space-y-2">

                            <div onClick={() => {
                                updateProductCount({ productId: id,count: count+1 })
                            }} className="plus w-6 h-6 object-cover rounded-full bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white flex items-center justify-center cursor-pointer">
                                <i className='fa-solid fa-plus'></i>
                            </div>

                            <div onClick={() => {
                                updateProductCount({ productId: id,count: count-1 })
                            }}  className="minus w-6 h-6 object-cover rounded-full bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white flex items-center justify-center cursor-pointer">
                                <i className='fa-solid fa-minus'></i>
                            </div>
                        </div>
                    </div>

                    <span>{price} L.E</span>
                </div>

                <button onClick={() => {
                    removeProductFromCart({ productId: id })
                }} className='rounded bg-red-500 hover:bg-red-700 text-white flex items-center justify-center transition-colors duration-300 p-3  '>
                    <i className='fa-solid fa-xmark'></i>
                </button>
            </div>
        </>
    )
}
