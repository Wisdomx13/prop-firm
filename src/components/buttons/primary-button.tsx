import React from "react";
import { Button } from "../ui/button";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className="bg-gradient-to-r rounded-[48px] hover:shadow-[5px_5px_10px_#000] hover:scale-105 hover:transition-all duration-400 cursor-pointer from-[#FFD700] to-[#B8860B] text-black font-bold px-8 py-6 hover:opacity-90 transition-opacity w-max  shadow-lg shadow-[#FFD700]/20 text-sm md:text-base lg:text-lg !rounded-button whitespace-nowrap"
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
