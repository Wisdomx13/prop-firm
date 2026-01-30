// import Image from "next/image";
import Link from "next/link";
import React from "react";

// import logo from "@/../public/logo.png";
import Logo from "../Logo";

const Brand = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-xl text-white"
    >
      {/* <Image
        src={logo}
        alt="logo"
        className="w-[105px] md:w-[110px] lg:w-[130px]"
      /> */}
      <Logo />
    </Link>
  );
};

export default Brand;
