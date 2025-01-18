
import sliderImage1 from '../../assets/imgs/slider-image-1.jpeg'
import sliderImage2 from '../../assets/imgs/slider-image-2.jpeg'
import sliderImage3 from '../../assets/imgs/slider-image-3.jpeg'

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';

export default function HomeSlider() {
  return (
    <>
      <section className=" flex flex-col sm:grid grid-cols-12 mb-8  ">

        <div className="col-span-8 mb-2">
          <Swiper  slidesPerView={1} loop={true}>
            <SwiperSlide className='bg-red-500'>
              <img className="w-full h-full object-cover" src={sliderImage3} alt="Slider Image 1" />
            </SwiperSlide>

            <SwiperSlide>
              <img className="w-full h-full object-cover" src={sliderImage3} alt="Slider Image 2" />
            </SwiperSlide>

            <SwiperSlide>
              <img className="w-full h-full object-cover" src={sliderImage3} alt="Slider Image 3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <img className="w-full" src={sliderImage1} alt="Slider Image_1" />
          <img className="w-full" src={sliderImage2} alt="Slider Image_2" />
        </div>
      </section>
    </>
  )
}
