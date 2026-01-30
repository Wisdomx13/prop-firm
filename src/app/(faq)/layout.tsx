import React from "react";

const FaqLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <div className="grow-effect absolute top-0 left-0 right-0 w-full h-[450px]"></div>
    </>
  );
};

export default FaqLayout;
