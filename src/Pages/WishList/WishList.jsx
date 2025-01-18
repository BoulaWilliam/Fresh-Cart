import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from './../../context/CartContext/Cart.Context';

export default function Wishlist() {
    const { wishListDetails, numOfFavoriteItems, getLoggedWishList, removeItemFromWishList } = useContext(CartContext);

    useEffect(() => {
        getLoggedWishList(); // Fetch wishlist data on component mount
    }, []);

    return (
        <section className="p-6">
            <div className="flex gap-8 items-center mb-6">
                <i className="text-3xl fa-solid fa-heart text-red-500"></i>
                <h2 className="text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:-left-1 before:top-1/2 before:-translate-y-1/2 before:bg-slate-600">
                    Your Wishlist
                </h2>
            </div>
            {numOfFavoriteItems === 0 ? (
                <div className="flex flex-col gap-3 justify-center items-center bg-gray-100 p-5 rounded-md shadow">
                    <h2 className="text-lg text-gray-600">
                        Oops! Your Wishlist is empty. Start exploring and save items you love!
                    </h2>
                    <NavLink
                        to="/"
                        className="btn bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-white px-4 py-2 rounded-md"
                    >
                        Back to Home
                    </NavLink>
                </div>
            ) : (
                <div className="space-y-4">
                    {wishListDetails.map((product) => (
                        <div
                            key={product._id}
                            className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.imageCover}
                                    alt={product.name}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">Price: ${product.price}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeItemFromWishList(product._id)}
                                className="btn bg-red-500 hover:bg-red-700 transition-colors duration-300 text-white px-3 py-1 rounded-md"
                            >
                                <i className="fa-solid fa-trash"></i> Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
