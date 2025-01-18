import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../Components/Card/Card'; // Assuming you have a Card component for product display

export default function Brands() {
    const [brands, setBrands] = useState(null); // Store brands
    const [loading, setLoading] = useState(false); // Loading state
    const [subBrands, setSubBrands] = useState(null); // Store sub-brands of the selected brand
    const [relatedProducts, setRelatedProducts] = useState(null); // Store related products

    const BaseUrl = 'https://ecommerce.routemisr.com'; // Replace with your base URL

    // Fetch all brands
    async function getBrands() {
        setLoading(true); // Start loading
        try {
            const { data } = await axios.get(`${BaseUrl}/api/v1/brands`);
            setBrands(data?.data); // Update brands state
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    // Fetch related products by brand
    async function fetchRelatedProducts(brandId) {
        setLoading(true); // Start loading
        try {
            const { data } = await axios.get(
                `${BaseUrl}/api/v1/products?brand=${brandId}`
            );
            setRelatedProducts(data?.data); // Update related products state
        } catch (error) {
            console.error("Error fetching related products:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    useEffect(() => {
        getBrands(); // Fetch brands on component mount
    }, []);

    return (
        <>
            {/* Brands Grid */}
            {loading ? (
                <Loading />
            ) : (
                brands && (
                    <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-5">
                        {brands.map((brand) => (
                            <div
                                key={brand._id}
                                className="brand-card group p-3 m-2 shadow-lg rounded-lg overflow-hidden border-2 duration-300 hover:border-primary-800 text-center cursor-pointer"
                                onClick={() => fetchRelatedProducts(brand._id)} // Fetch related products on click
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-full h-32 object-contain p-2"
                                />
                                <h1 className="py-2 text-lg font-semibold text-gray-800">
                                    {brand.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* Related Products Section */}
            {relatedProducts && (
                <section className="px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl text-gray-600 my-8">Related Products To That Brand</h2>
                    <Swiper
                        slidesPerView={6} // Default for large screens
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
                        {relatedProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Card productInfo={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}
        </>
    );
}
