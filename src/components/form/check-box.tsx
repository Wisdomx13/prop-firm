"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoCheckbox, IoCheckboxOutline } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChecked?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckboxProps> = ({ label, id, name, onChecked }) => {
  const [isChecked, setChecked] = useState(false);
  const { isDark } = useTheme();

  const handleCheck = (e: any) => {
    setChecked(e.target.checked);
    if (onchange) {
      onChecked!(e.target.checked);
    }
  };

  return (
    <div>
      <input
        checked={isChecked}
        onChange={handleCheck}
        type="checkbox"
        className="hidden"
        name={name}
        id={id}
      />
      <label
        htmlFor={id}
        className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}
      >
        {isChecked ? (
          <IoCheckbox className={`w-5 h-5 cursor-pointer ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
        ) : (
          <IoCheckboxOutline className={`w-5 h-5 cursor-pointer ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
        )}
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
