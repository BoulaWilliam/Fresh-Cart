import axios from "axios";
import { createContext, useContext } from "react";
import { userContext } from "../UserContext/User.context";
import toast from "react-hot-toast";
import { useState } from "react";

export const CartContext = createContext(null)


export default function CartProvider({ children }) {
    const { token } = useContext(userContext)
    const [cartInfo, setCartInfo] = useState(null)

    // -------------------Product Functions----------------------
    // Add Product To Cart
    async function addProductToCart({ productId }) {
        let toastId = toast.loading("Adding Product..")
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                method: 'POST',
                headers: {
                    token: token
                },
                data: {
                    productId: productId
                }
            }
            let { data } = await axios.request(options)
            if (data.status == 'success') {
                toast.success(data.message)
                getCartProducts()
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            toast.dismiss(toastId)
        }
    }

    // Get Product From Cart
    async function getCartProducts() {
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                method: 'GET',
                headers: {
                    token: token
                }
            }
            let { data } = await axios.request(options)
            setCartInfo(data)

        } catch (error) {
            console.log(error);
        }
    }

    // Remove Product From Cart
    async function removeProductFromCart({ productId }) {
        let toastId = toast.loading("Removing Product..")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            }

            let { data } = await axios.request(options);
            if (data.status == 'success') {
                toast.success("Product Removed Successfully ✅")
                setCartInfo(data)
            }
        } catch (error) {
            toast.error(error)
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // Clear Products From Cart
    async function clearCart() {
        let toastId = toast.loading("Clear Cart...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            }

            let { data } = await axios.request(options);
            if (data.message == 'success') {
                toast.success("Cart Cleared Successfully ✅")
                setCartInfo({
                    numOfCartItems: 0
                })
            }
        } catch (error) {
            toast.error(error)
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // Update Product Count
    async function updateProductCount({ productId, count }) {
        let toastId = toast.loading("Update Count...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: 'PUT',
                headers: {
                    token: token
                },
                data: {
                    count: count
                }
            }

            let { data } = await axios.request(options);
            if (data.status == 'success') {
                toast.success("Count Updated Successfully ✅")
                setCartInfo(data)
            }
        } catch (error) {
            toast.error(error)
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    //----------------------------------- WishList Functions--------------------------------------
    const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);
    const [wishListDetails, setWishListDetails] = useState(null);

    // Common headers
    const headers = { token }; // Consolidated headers for reuse


    // Fetch the logged-in user's Wish List
    async function getLoggedWishList() {
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
                method: 'GET',
                headers: {
                    token: token
                }
            };
            let { data } = await axios.request(options);
            setWishListDetails(data.data);
            console.log(data.data);
            
            setNumOfFavoriteItems(data.data.length);
        } catch (error) {
            console.error(error);
        }
    }


    // Add a product to the Wish List
    async function addToWishList({ productId }) {
        let toastId = toast.loading("Adding to Wish List...");
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
                method: 'POST',
                headers: headers,
                data: {
                    productId: productId
                }
            };
            const { data } = await axios.request(options);
            if (data.status === 'success') {
                toast.success(data.message || "Added to Wish List successfully.");
                await getLoggedWishList(); // Refresh Wish List after addition
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to Wish List.");
        } finally {
            toast.dismiss(toastId);
        }
    }

    // Remove a product from the Wish List
    async function removeItemFromWishList(productId) {
        let toastId = toast.loading("Removing from Wish List...");
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            if (data.status === 'success') {
                toast.success("Removed from Wish List successfully.");
                await getLoggedWishList(); // Refresh Wish List after removal
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove from Wish List.");
        } finally {
            toast.dismiss(toastId);
        }
    }

    //-------------------------------------------------------------------------------------------- 
    return (
        <CartContext.Provider value={{
            addProductToCart, getCartProducts, wishListDetails, numOfFavoriteItems, removeItemFromWishList, addToWishList,
            getLoggedWishList, clearCart, removeProductFromCart, updateProductCount, cartInfo
        }}>
            {children}
        </CartContext.Provider>
    )
}