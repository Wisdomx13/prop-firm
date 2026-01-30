/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

const Products = () => {
  const [selectedProductType, setSelectedProductType] = React.useState(
    "X-1 Step Evaluation"
  );
  const [selectedAccountBalance, setSelectedAccountBalance] =
    React.useState("");
  const [selectedPlatform, setSelectedPlatform] = React.useState("MATCHTRADER");

  const productTypeOptions = [
    "X-1 Step Evaluation",
    "X-2 Step Evaluation",
    "X-1 Step Evaluation [Crypto]",
    "X-2 Step Evaluation [Crypto]",
    "Instant Funded X",
  ];

  const accountBalanceOptions = [
    "$5,000.00",
    "$10,000.00",
    "$25,000.00",
    "$50,000.00",
    "$100,000.00",
    "$250,000.00",
    "$400,000.00",
  ];

  const platformOptions = ["MATCHTRADER", "DXTRADE", "CTRADER"];

  return (
    <div className=" overflow-x-hidden overflow-y-hidden relative  pt-5 pb-6 w-full md:w-[60%] bg-black rounded-2xl min-h-[720px] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
      <h1 className="textx-2xl lg:text-3xl font-semibold relative pl-4">
        Billing Info
        <div className="absolute w-[8px] h-full bg-[#FFD700] rounded-e-2xl top-0 left-0"></div>
      </h1>
      <div className="w-full mt-8">
        <section className="grid  gap-2">
          <SelectionSection
            title="Product Type"
            options={productTypeOptions}
            selectedOption={selectedProductType}
            onOptionSelect={setSelectedProductType}
            gap="gap-2"
          />

          <SelectionSection
            title="Account Balance"
            options={accountBalanceOptions}
            selectedOption={selectedAccountBalance}
            onOptionSelect={setSelectedAccountBalance}
            gap="gap-5"
          />

          <SelectionSection
            title="Platform"
            options={platformOptions}
            selectedOption={selectedPlatform}
            onOptionSelect={setSelectedPlatform}
            gap="gap-5"
          />
        </section>
      </div>
    </div>
  );
};

export default Products;

interface SelectionSectionProps {
  title: string;
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  gap?: string;
}

export function SelectionSection({
  title,
  options,
  selectedOption,
  onOptionSelect,
  gap = "gap-2",
}: SelectionSectionProps) {
  return (
    <>
      <h2 className="px-2 pb-2 text-xl font-medium leading-7">
        <span className="shrink-0 gap-2 justify-items-center w-max">
          {title}
        </span>
      </h2>
      <section
        className={`grid gap-2 grid-cols-2 lg:grid-cols-3 p-2 w-full rounded-md bg-zinc-800`}
      >
        {options.map((option) => (
          <SelectionOption
            key={option}
            option={option}
            isSelected={option === selectedOption}
            onSelect={() => onOptionSelect(option)}
          />
        ))}
      </section>
    </>
  );
}

interface SelectionOptionProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function SelectionOption({
  option,
  isSelected,
  onSelect,
}: SelectionOptionProps) {
  const baseClasses =
    "flex justify-center items-center px-4 py-2 w-full font-medium rounded-md ease-in-out animate-[0.3s_ease_0s_1_normal_none_running_none] duration-[0.3s]";

  const selectedClasses = "bg-[#FFD700] text-neutral-800";
  const unselectedClasses = "bg-neutral-900";

  return (
    <button
      onClick={onSelect}
      data-state={isSelected ? "checked" : undefined}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
      aria-selected={isSelected}
      role="option"
    >
      <span className="relative gap-2">{option}</span>
    </button>
  );
}
