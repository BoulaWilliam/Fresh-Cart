import { useContext } from "react"
import { CartContext } from "../../context/CartContext/Cart.Context"
import { Link } from "react-router-dom"

export default function Card({productInfo}) {
    const {imageCover,title,category,price,ratingsAverage,description,id} = productInfo
    const  {addProductToCart,addToWishList} = useContext(CartContext)
    return (
        <>
            <div className="card group/card space-y-3 m-2 shadow-lg rounded-lg overflow-hidden border-2  duration-300 hover:border-primary-800">
                <div className="imageLayer  relative">
                    <img src={imageCover} className="w-full h-full object-cover" alt="" />
                    <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 bg-opacity-30 opacity-0 gap-4 flex items-center justify-center absolute left-0 top-0 w-full h-full bg-slate-400">
                        <div  onClick={()=> {
                            addToWishList({productId:id})
                        }} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                            <i className="fa-solid fa-heart"></i>
                        </div>

                        <div onClick={()=> {
                            addProductToCart({productId:id})
                        }} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>

                        <Link to={`/productDetails/${id}`} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                            <i className="fa-solid fa-eye"></i>
                        </Link>
                    </div>
                </div>
                <div className="card-body p-4">
                    <header>
                        <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">{title}</h3>
                        <h4 className="text-primary-600 font-semibold">{category.name}</h4>
                    </header>
                    <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
                    <hr className="my-3 "/>
                    <div className="flex items-center justify-between">
                        <span>{price} L.E</span>
                        <div>
                            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
                            <span>{ratingsAverage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
