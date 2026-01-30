"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years } from "@/lib/utils";

export const DateOfBirthSelector: React.FC = () => {
  const yearsList = years();
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <label
        htmlFor="undefined-form-item"
        className="text-sm font-light leading-5 text-left rounded"
      >
        Date Of Birth
      </label>
      <div className="flex gap-1 items-center w-full">
        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-[#171717] border border-[#B8860B] focus:border-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#171717] text-white border border-[#B8860B]">
              {yearsList.map((y, i) => (
                <SelectItem value={y.toString()} key={i}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-[#171717] border border-[#B8860B] focus:border-white">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="bg-[#171717] text-white border border-[#B8860B]">
              {monthList.map((m, i) => (
                <SelectItem value={m} key={i}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-[#171717] border border-[#B8860B] focus:border-white">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent className="bg-[#171717] text-white border border-[#B8860B]">
              {dates.map((d, i) => (
                <SelectItem value={d.toString()} key={i}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div />
    </div>
  );
};
