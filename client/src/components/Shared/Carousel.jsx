import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { API_BASE_URL } from '../../config/apiUrl';
const Carousel = ({ data }) => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const responsive = {
        0: { items: 1, gutter: 16 },
        720: { items: 1, gutter: 24 },
        1024: { items: 1, gutter: 30 },
    };
    const slidePrev = () => {
        carouselRef.current.slidePrev();
    };
    const slideNext = () => {
        carouselRef.current.slideNext();
    };
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    const items = data.slice(0, 10).map((item, index) => (
        <img
            src={`${API_BASE_URL}/images/${item}`}
            alt={`Recipe image ${index + 1}`}
            className="object-cover  w-full h-[22rem]"
        />
    ));

    return (
        <div className='px-4 lg:px-8'>
            <div className='relative p-5  w-fullh-full'>
                <AliceCarousel
                    ref={carouselRef}
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    disableButtonsControls
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 1 && 
                    <MdArrowForwardIos onClick={slideNext} className='absolute top-[40%] -right-[4%] text-primary cursor-pointer hover:secondary' size={30} />
                }
                {activeIndex !== 0 &&
                    <MdArrowBackIosNew onClick={slidePrev} className='absolute top-[40%] -left-[4%] text-primary cursor-pointer hover:secondary' size={30} />}
            </div>
        </div>
    );
};

export default Carousel;
