"use client";
import React from "react";

const ContactForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted");
  };

  return (
    <section className="container flex justify-center items-center pt-64 lg:py-14 lg:pt-14">
      <div className="p-5 lg:p-8 rounded-2xl border border-[#FFD700] border-solid   w-[95%] md:w-[350px] lg:w-[650px]">
        <header>
          <h2 className="mb-5 text-2xl lg:text-3xl  font-bold text-center text-[white]">
            SEND US A MESSAGE!
          </h2>
          <p className="mb-8 text-sm lg:text-base text-center text-[white]">
            Please complete the form below for any assistance or inquiries.
          </p>
        </header>

        <form className="flex flex-col gap-3 lg:gap-5" onSubmit={handleSubmit}>
          <FormInput type="text" placeholder="Full Name" required />

          <div className="flex gap-5 max-sm:flex-col">
            <FormInput
              type="email"
              placeholder="Email"
              required
              className="flex-1"
            />
            <FormInput
              type="tel"
              placeholder="Phone"
              required
              className="flex-1"
            />
          </div>

          <FormInput type="text" placeholder="Country" required />

          <FormTextArea placeholder="Message" rows={4} />

          <SubmitButton />
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      className={`px-5 py-3 text-base rounded-md border border-gray-500 border-solid ${className}`}
      {...props}
    />
  );
};

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  className = "",
  ...props
}) => {
  return (
    <textarea
      className={`px-5 py-3 text-base rounded-md border border-gray-500 border-solid resize-y ${className}`}
      {...props}
    />
  );
};

const SubmitButton: React.FC = () => {
  return (
    <button
      className="px-8 py-2 text-lg font-semibold bg-[#FFD700] rounded-md transition-colors cursor-pointer border-[none] duration-[0.3s] ease-[ease] text-[black] hover:bg-[#ffd900d5]"
      type="submit"
    >
      SUBMIT NOW
    </button>
  );
};
