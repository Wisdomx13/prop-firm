import React from "react";
import Link from "next/link";

const HeaderActionButtons = () => {
  return (
    <div className="flex gap-6 items-center">
      <Link
        href="/signin"
        className="text-white/90 text-sm font-medium tracking-wide hover:text-[#FFD700] transition-all duration-300 drop-shadow-sm"
      >
        TRADER LOGIN
      </Link>
      <Link
        href="/signup"
        className="px-6 py-2.5 rounded-full bg-white/5 border border-[#FFD700]/40 text-white text-sm font-medium tracking-wide backdrop-blur-xl hover:bg-[#FFD700]/10 hover:border-[#FFD700]/80 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300"
      >
        GET FUNDED
      </Link>
    </div>
  );
};

export default HeaderActionButtons;
