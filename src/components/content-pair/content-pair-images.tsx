/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

interface ContentPairImagesProps {
  images: any[];
}
const ContentPairImages = ({ images }: ContentPairImagesProps) => {
  return (
    <div className="relative group">
      {/* Ambient glow behind image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-blue-500/10 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Glass frame around swiper */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-2 !h-2 !mx-1',
            bulletActiveClass: '!bg-[#FFD700] !w-8 !rounded-full',
          }}
          modules={[EffectFade, Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="!pb-12 w-full overflow-hidden rounded-2xl"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="relative overflow-hidden rounded-2xl">
                {/* Image container with hover effect */}
                <div className="relative transform transition-transform duration-700 hover:scale-105">
                  <Image
                    src={image}
                    alt={`Platform preview ${i + 1}`}
                    className="w-full h-auto mx-auto rounded-2xl"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[#FFD700]/30 rounded-tl-xl" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-[#FFD700]/30 rounded-tr-xl" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-[#FFD700]/30 rounded-bl-xl" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[#FFD700]/30 rounded-br-xl" />
      </div>
    </div>
  );
};

export default ContentPairImages;
