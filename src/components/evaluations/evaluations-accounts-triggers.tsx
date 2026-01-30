"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const EvaluationsAccountsTriggers = ({
  Triggers,
}: {
  Triggers: React.ReactNode[];
}) => {
  return (
    <div className="w-full">
      <Swiper slidesPerView={"auto"} spaceBetween={10} className=" !w-full">
        {Triggers.map((Trigger, i) => (
          <SwiperSlide
            key={i}
            className="max-w-[110px] md:max-w-[150px] lg:max-w-[200px]"
          >
            {Trigger}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EvaluationsAccountsTriggers;
