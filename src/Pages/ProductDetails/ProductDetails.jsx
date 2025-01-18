import React, { useContext, useEffect, useState } from 'react';
import Loading from './../../Components/Loading/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/Cart.Context';
import axios from 'axios';
import ReactImageGallery from 'react-image-gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import Card from './../../Components/Card/Card';

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProductDetails, setRelatedProductDetails] = useState(null);
    const { addProductToCart } = useContext(CartContext);
    let { id } = useParams();
    const navigate = useNavigate();

    // Get Product Details
    async function getProductDetails(productId) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
                method: 'GET',
            };
            let { data } = await axios.request(options);
            setProductDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Get Related Products
    async function getRelatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: 'GET'
            };
            const { data } = await axios.request(options);
            setRelatedProductDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle View Details for Related Products
    const handleViewDetails = (productId) => {
        navigate(`/product-details/${productId}`); // Navigate to the selected product's details page
        getProductDetails(productId); // Fetch details for the selected product
    };

    // Initial Render
    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    // Call getRelatedProducts after product details are loaded
    useEffect(() => {
        if (productDetails) {
            getRelatedProducts();
        }
    }, [productDetails]);

    return (
        <>
            {productDetails ? (
                <>
                    <section className='flex flex-col md:flex-row gap-12 grid-cols-12'>
                        <div className='md:w-1/4 w-full'>
                            <ReactImageGallery
                                showNav={false}
                                autoPlay={true}
                                showPlayButton={false}
                                items={productDetails.images.map((image) => ({
                                    original: image,
                                    thumbnail: image,
                                }))}
                            />
                        </div>
                        <div className='md:w-3/4 w-full space-y-4'>
                            <div>
                                <h1 className='text-2xl font-semibold text-gray-600'>{productDetails.title}</h1>
                                <h2 className='text-primary-600 font-semibold'>{productDetails.category?.name}</h2>
                            </div>
                            <p className='text-gray-400'>{productDetails.description}</p>
                            <div className='flex justify-between items-center'>
                                <span>{productDetails.price} L.E</span>
                                <div>
                                    <i className='fa-solid fa-star mr-2 text-yellow-600'></i>
                                    <span>{productDetails.ratingsAverage}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => addProductToCart({ productId: id })}
                                className='btn bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-white w-full'
                            >
                                Add To Cart
                            </button>
                        </div>
                    </section>

                    <section className="px-4 md:px-8 lg:px-16">
                        <h2 className="text-2xl text-gray-600 my-8">Related Products</h2>
                        {relatedProductDetails ? (
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={15}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 10 },
                                    640: { slidesPerView: 2, spaceBetween: 10 },
                                    768: { slidesPerView: 3, spaceBetween: 12 },
                                    1024: { slidesPerView: 4, spaceBetween: 15 },
                                    1280: { slidesPerView: 5, spaceBetween: 15 },
                                    1536: { slidesPerView: 6, spaceBetween: 15 },
                                }}
                            >
                                {relatedProductDetails.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Card
                                            productInfo={product}
                                            getProductDetails={() => handleViewDetails(product.id)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <Loading />
                        )}
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
