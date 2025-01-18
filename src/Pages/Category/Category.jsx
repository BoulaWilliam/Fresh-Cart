import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../Components/Card/Card'; // Assuming you have a Card component for product display

export default function Category() {
    const [categories, setCategories] = useState(null); // All categories
    const [subcategories, setSubcategories] = useState(null); // Related subcategories
    const [relatedProducts, setRelatedProducts] = useState(null); // Related products
    const [loading, setLoading] = useState(false); // Loading state

    const BaseUrl = 'https://ecommerce.routemisr.com'; // Base URL

    // Fetch all categories
    async function getCategories() {
        try {
            const { data } = await axios.get(`${BaseUrl}/api/v1/categories`);
            setCategories(data?.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    // Fetch related subcategories and products by category
    async function getDetailsByCategory(catId) {
        setLoading(true); // Start loading
        try {
            // Fetch subcategories
            const subcategoryResponse = await axios.get(`${BaseUrl}/api/v1/subcategories?category=${catId}`);
            setSubcategories(subcategoryResponse?.data?.data);

            // Fetch related products
            const productResponse = await axios.get(`${BaseUrl}/api/v1/products?category=${catId}`);
            setRelatedProducts(productResponse?.data?.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    useEffect(() => {
        getCategories(); // Load categories on component mount
    }, []);

    return (
        <>
            {/* Category Grid */}
            {!categories ? (
                <Loading />
            ) : (
                <div className="grid cursor-pointer sm:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="card group p-3 m-2 shadow-lg rounded-lg overflow-hidden border-2 duration-300 hover:border-primary-800 text-center"
                            onClick={() => getDetailsByCategory(category._id)} // Fetch related subcategories and products on click
                        >
                            <div className="imageLayer w-full">
                                <img
                                    src={category.image}
                                    className="w-full h-60 object-cover rounded-t-lg"
                                    alt={category.name}
                                />
                            </div>
                            <h1 className="py-2 text-lg font-semibold text-gray-800">{category.name}</h1>
                        </div>
                    ))}
                </div>
            )}

            {/* Related Subcategories Section */}
            {loading ? (
                <Loading />
            ) : (
                subcategories && (
                    <div className="p-5 mt-5">
                        <h1 className="py-2 text-2xl font-bold text-gray-800">Related Subcategories</h1>
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            {subcategories.map((subcategory) => (
                                <div
                                    key={subcategory._id}
                                    className="subcategory-card group cursor-pointer shadow-primary-600 p-3 m-2 shadow-lg rounded-lg overflow-hidden border-2 duration-300 hover:border-primary-800 text-center"
                                >
                                    <h1 className="py-2 text-lg font-semibold text-gray-800">{subcategory.name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Related Products Section */}
            {loading ? (
                <Loading />
            ) : (
                relatedProducts && (
                    <section className="px-4 md:px-8 lg:px-16">
                        <h2 className="text-2xl text-gray-600 my-8">Related Products</h2>
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
                            {relatedProducts.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <Card productInfo={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                )
            )}
        </>
    );
}
