import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CategorySlider() {
    const [categories, setCategories] = useState(null);

    async function getCategories() {
        const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(data?.data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <section className="my-8">
                <h2 className="mb-5 text-lg text-gray-600 font-semibold">
                    Shop Popular Categories
                </h2>
                {!categories ? (
                    <Loading />
                ) : (
                    <Swiper
                        slidesPerView={6} // Default for large screens
                        loop={true}
                        spaceBetween={16} // Add spacing between slides
                        breakpoints={{
                            // Responsive breakpoints
                            320: { slidesPerView: 1 }, // Mobile
                            480: { slidesPerView: 2 }, // Small screens
                            768: { slidesPerView: 3 }, // Tablets
                            1024: { slidesPerView: 4 }, // Small desktops
                            1280: { slidesPerView: 6 }, // Large desktops
                        }}
                    >
                        {categories?.map((category) => (
                            <SwiperSlide key={category._id}>
                                <div className="h-64">
                                    <img
                                        className="w-full h-full object-cover rounded-lg"
                                        src={category.image}
                                        alt={category.name}
                                    />
                                </div>
                                <h3 className="mt-3 text-center text-gray-700 font-medium">
                                    {category.name}
                                </h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </section>
        </>
    );
}
