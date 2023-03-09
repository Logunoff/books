import React, { useState } from 'react';
import { Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { hostUrl } from '../../constants/urls';

import './slider.css';

import 'swiper/css';

export const Slider = ({ imageArr }) => {
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <React.Fragment>
      <Swiper
        data-test-id='slide-big'
        loop={true}
        grabCursor={true}
        pagination={true}
        modules={[Thumbs, Pagination]}
        thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
        className='slider'
      >
        {imageArr.map((item) => (
          <SwiperSlide key={item.url}>
            <img src={hostUrl + item.url} alt='slider' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        modules={[Thumbs]}
        spaceBetween={60}
        onSwiper={setActiveThumb}
        slidesPerView={4}
        className='slider-thumbs'
      >
        {imageArr.length === 1 ? (
          ''
        ) : (
          <div className='slider-thumbs-wrapper'>
            {imageArr.map((item) => (
              <SwiperSlide data-test-id='slide-mini' key={item.url}>
                <img src={hostUrl + item.url} alt='slider' />
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>
    </React.Fragment>
  );
};
