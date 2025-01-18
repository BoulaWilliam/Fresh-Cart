import { useContext, useEffect, useState } from 'react';
import { userContext } from './../../context/UserContext/User.context';
import { jwtDecode } from "jwt-decode";
import Loading from './../../Components/Loading/Loading';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(userContext);
    let { id } = jwtDecode(token);

    async function createCashOrder() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            };
            let { data } = await axios.request(options);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        createCashOrder();
    }, []);

    return (
        <>
            {orders ? (
                <section className="space-y-8 px-6 py-10 bg-gray-50 min-h-screen">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                        Your Orders
                    </h1>
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="order-card bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                        >
                            <header className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-gray-500 text-sm uppercase tracking-wide">
                                        Order ID
                                    </h2>
                                    <span className="text-xl font-bold text-gray-700">
                                        #{order.id}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    {order.isPaid ? (
                                        <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-sm">
                                            Paid <i className="fa-solid fa-money-bill"></i>
                                        </span>
                                    ) : (
                                        <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-sm">
                                            Unpaid <i className="fa-solid fa-money-bill"></i>
                                        </span>
                                    )}
                                    {order.isDelivered ? (
                                        <span className="inline-block px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full shadow-sm">
                                            Delivered <i className="fa-solid fa-check"></i>
                                        </span>
                                    ) : (
                                        <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-sm">
                                            Out for Delivery <i className="fa-solid fa-shipping-fast"></i>
                                        </span>
                                    )}
                                </div>
                            </header>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {order.cartItems.map((product) => (
                                    <div
                                        key={product._id}
                                        className="product-card overflow-hidden bg-gray-100 rounded-lg shadow-sm border border-gray-300 transition-transform transform hover:scale-105"
                                    >
                                        <img
                                            src={product.product.imageCover}
                                            alt=""
                                            className="w-full object-cover rounded-md mb-4"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-700 truncate line-clamp-2">
                                                <NavLink to={`/productDetails/${product.product.id}`}>
                                                    {product.product.title}

                                                </NavLink>
                                            </h3>
                                            <div className="flex justify-between items-center mt-3 text-sm">
                                                <span className="font-medium text-gray-600">
                                                    Quantity: {product.count}
                                                </span>
                                                <span className="text-primary-600 font-semibold">
                                                    {product.price} L.E
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className='text-xl mt-5'>
                                <i className='fa-solid fa-sack-dollar text-xl mr-2 text-primary-800'></i>
                                Your Total Order Price = <span className='text-primary-800 font-bold'> {order.totalOrderPrice}  L.E</span> </p>
                        </div>
                    ))}
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}
