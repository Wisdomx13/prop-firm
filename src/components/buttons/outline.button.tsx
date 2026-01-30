import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const OutlineButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="cursor-pointer max-w-80 px-5 py-2 bg-black rounded-[48px] shadow-[inset_0px_0px_20px_0px_#ffd9006f]  outline-1 outline-offset-[-1px] outline-[#ffd90088] hover:bg-[#ffd90088]/15 hover:transition-colors inline-flex justify-center items-center gap-2.5 overflow-hidden text-xs lg:text-sm"
    >
      {children}
    </button>
  );
};

export default OutlineButton;
