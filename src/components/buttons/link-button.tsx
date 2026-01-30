import Link from "next/link";
import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string;
  target?: string;
};
const LinkButton: React.FC<ButtonProps> = ({
  children,
  href,
  target,
  ...props
}) => {
  return (
    <button
      {...props}
      className="text-center uppercase justify-center hover:underline text-white text-xs lg:text-sm font-medium font-['Inter'] leading-normal"
    >
      <Link href={href} target={target}>
        {children}
      </Link>
    </button>
  );
};

export default LinkButton;
