/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";

export const FormFooter: React.FC = () => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [showDiscountField, setShowDiscountField] = React.useState(false);

  return (
    <footer>
      <div className="flex overflow-x-hidden overflow-y-hidden relative flex-col gap-4 px-3 rounded">
        <div className="flex flex-col mt-10 mb-4 text-stone-300">
          <div className="flex items-center">
            <input type="checkbox" id="agreementFields_Terms" />
            <label htmlFor="agreementFields_Terms" className="ml-2">
              I declare that I have read and agree with Terms & Conditions
            </label>
          </div>
          <span className="text-red-500" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl leading-7">Purchase Price</h2>
            <div className="gap-2 text-4xl leading-10 text-[#FFD700]">
              $0.00
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="z-10 px-5 py-3 font-semibold bg-[#FFD700] rounded-full ease-in-out select-none animate-[0.3s_ease_0s_1_normal_none_running_none] border-black border-opacity-0 duration-[0.3s] shadow-[rgb(255,255,255)_0px_0px_0px_0px,rgba(59,130,246,0.5)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px] text-neutral-800"
        >
          Create Order
        </button>
        <button
          type="button"
          onClick={() => setShowDiscountField(!showDiscountField)}
          className="mb-2 w-full h-10 text-sm font-medium leading-5 rounded transition-colors ease-in-out select-none bg-black bg-opacity-0 border-black border-opacity-0 duration-[0.15s]"
        >
          Have a discount code?
        </button>
        {showDiscountField && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter discount code"
              className="flex px-3 py-2 w-full h-10 text-sm leading-5 rounded-md border border-teal-400 bg-neutral-900 overflow-x-clip overflow-y-clip"
            />
            <button
              type="button"
              className="px-3 py-1 text-sm bg-[#f8d614] rounded text-neutral-800"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
