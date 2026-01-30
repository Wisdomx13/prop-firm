import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-max px-7 py-3 hover:transition-all duration-400 hover:scale-105 cursor-pointer bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(255,_255,_255,_0.12)_0%,_rgba(0,_0,_0,_0)_100%)] rounded-[48px] shadow-[0px_16px_32px_-8px_rgba(10,124,255,0.48)] shadow-[0px_4px_8px_0px_rgba(10,124,255,0.12)] shadow-[0px_2px_6px_0px_rgba(10,124,255,0.24)] shadow-[0px_1px_3px_0px_rgba(10,124,255,0.24)] shadow-[inset_1px_1px_2px_0px_rgba(255,255,255,0.24)]  gap-2.5 overflow-hidden flex justify-center items-center  ${className}`}
    >
      <div className="pr-[0.50px] flex justify-center items-start">
        <span className="text-center flex justify-center items-center gap-2 text-white text-sm md:text-base lg:text-lg font-medium font-['Inter'] leading-normal">
          {children}
        </span>
      </div>
    </button>
  );
};

export default SecondaryButton;
