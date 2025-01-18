import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext/Cart.Context';
import { userContext } from '../../context/UserContext/User.context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
    const { cartInfo } = useContext(CartContext)
    const { token } = useContext(userContext)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const navigate = useNavigate()

    // Cash Order Function
    async function createCashOrder(values) {
        let toastId = toast.loading("We Are Creating Your Order")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token: token
                },
                data: values
            }

            let { data } = await axios.request(options)
            if (data.status == 'success') {
                toast.success("Your Order Has Been Created Successfully ✅")
                setTimeout(() => {
                    navigate('/allorders')
                }, 2000);
            }
            console.log(data);

        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }
    // Online Payment Order Function
    async function onlinePaymentOrder(values) {
        let toastId = toast.loading("Redirecting You To Payment Page ...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token: token
                },
                data: values
            }

            let { data } = await axios.request(options)
            if (data.status == 'success') {
                toast.success("Your Order Has Been Created Successfully ✅")
                setTimeout(() => {
                    location.href = data.session.url
                }, 2000);
            }
            console.log(data);

        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }


    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },

        onSubmit: (values)=>{
            if(paymentMethod == "cash") createCashOrder(values);
            else onlinePaymentOrder(values)
        }
    })

    return <>
        <section>

            <h1 className='text-xl text-gray-600 font-semibold mb-4'>Shipping Address  <i className='fa-solid fa-shipping-fast text-xl text-primary-800'></i> </h1>
            <form className='space-y-4' onSubmit={formik.handleSubmit}>

                {/* Phone */}
                <div className="phone">
                    <input type="tel" className="form-control w-full" placeholder="phone"
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                        name='shippingAddress.phone' />
                </div>

                {/* City */}
                <div className="city">
                    <input type="text" className="form-control w-full" placeholder="City"
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                        name='shippingAddress.city' />
                </div>

                {/* Details */}
                <div className="details">
                    <textarea className="form-control w-full" placeholder="details"
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        name='shippingAddress.details' >
                    </textarea>
                </div>

                <div className="Btns">
                    <button onClick={()=>{
                        setPaymentMethod("cash")
                    }} type='submit' className='btn mr-3 text-center mt-8 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white'>Cash Order</button>
                    <button onClick={()=>{
                        setPaymentMethod("online")
                    }}  type='submit' className='btn text-center mt-8 bg-orange-600 hover:bg-orange-700 transition-colors duration-300 text-white'>Online Payment</button>
                </div>
            </form>

        </section>
    </>
}
