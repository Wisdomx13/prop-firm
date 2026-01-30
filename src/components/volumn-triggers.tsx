"use client";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";

const VolumnTriggers = ({ Triggers }: { Triggers: React.ReactNode[] }) => {
  return (
    <div className="max-w-full w-full overflow-x-auto scroll-bar">
      <div className="flex flex-nowrap justify-start gap-2 lg:gap-4 items-center">
        {Triggers.map((Trigger, i) => (
          <div
            key={i}
            className="max-w-[110px] md:max-w-[150px] lg:max-w-[200px] flex-grow"
          >
            {Trigger}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolumnTriggers;