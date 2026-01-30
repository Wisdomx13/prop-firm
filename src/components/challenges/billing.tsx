"use client";
import React from "react";
import { FormField } from "../form/form-field";
import { DateOfBirthSelector } from "@/components/form/dateofbirth-selector";

import { FormFooter } from "../form/form-footer";

const Billing = () => {
  return (
    <div>
      <div className="flex  overflow-x-hidden overflow-y-hidden relative flex-col gap-10  pt-5 pb-6 w-full   rounded-2xl min-h-[720px] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <h1 className="textx-2xl lg:text-3xl font-semibold relative pl-4">
          Billing Info
          <div className="absolute w-[8px] h-full bg-[#FFD700] rounded-e-2xl top-0 left-0"></div>
        </h1>
        <BillingInfoForm />
      </div>
    </div>
  );
};

export default Billing;

export const BillingInfoForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1 ",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex overflow-x-hidden overflow-y-hidden relative flex-col gap-3 px-7  rounded-2xl">
        <FormField
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          autoComplete="First Name"
        />

        <FormField
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          autoComplete="Last Name"
        />

        <FormField
          label="Email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          dataCy="email"
        />

        <DateOfBirthSelector />

        <FormField
          label="Phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          autoComplete="phone"
          dataCy="phone"
        />

        <FormField
          label="Street Address"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleInputChange}
          autoComplete="Street Address"
        />

        <FormField
          label="Country"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
          autoComplete="Country"
        />

        <FormField
          label="City"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          autoComplete="City"
        />

        <FormField
          label="Postal Code"
          name="zip"
          placeholder="Postal Code"
          value={formData.zip}
          onChange={handleInputChange}
          autoComplete="Postal Code"
        />
      </section>

      <FormFooter />
    </form>
  );
};
