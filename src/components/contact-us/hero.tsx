import Link from "next/link";
import React from "react";
import PrimaryButton from "../buttons/primary-button";
import { FaArrowCircleRight } from "react-icons/fa";
import SecondaryButton from "../buttons/secondary-button";
import Email from "../icon/email";
// import Location from "../icon/location";
import { RiDiscordFill } from "react-icons/ri";
import { Contact } from "../../../data/page/contact";

const ContactHero = () => {
  return (
    <div className="container h-[100vh] pt-64 md:pt-0 lg:h-[80vh] flex items-center">
      <div className="flex gap-10 justify-between items-center max-md:flex-col">
        <ContactHeader />
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactHero;

const ContactHeader: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="px-5 py-2.5  text-base md:text-lg lg:text-xl font-semibold text-[#FFD700] ">
        BEST FIRM IN ASIA
      </div>
      <h1 className="mb-5 text-7xl font-extrabold text-[#FFD700] max-md:text-5xl">
        Contact Us
      </h1>
      <p className="mb-8 text-base lg:text-lg leading-relaxed text-[white]">
        We believe in transparency, fairness, and genuine support. More than a
        prop firm, we&apos;re your trading partners, dedicated to your success.{" "}
      </p>
      <div className="flex gap-5 items-center flex-col md:flex-row">
        <Link href={"/challenges"}>
          <PrimaryButton className="flex items-center gap-2">
            <FaArrowCircleRight className="w-5 h-5 lg:w-6 lg:h-6" /> Get Started
          </PrimaryButton>
        </Link>
        <Link href={Contact.discord}>
          <SecondaryButton className="flex items-center gap-2">
            <RiDiscordFill className="text-foreground w-5 h-5 lg:w-6 lg:h-6" />
            Join Our Community
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
};

const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-wrap flex-1 gap-5">
      {/* <ContactCard
        Icon={Location}
        title="PIPZEN"
        content="Sublot 40, Level 3, Block A2, Saradise Kuching, Off Jalan Stutong, 93350 Kuching, Sarawak, Malaysia"
      /> */}
      <ContactCard
        Icon={Email}
        title="EMAIL ADDRESS"
        content="You may drop us an email to this email address support@pipzen.io"
      />
    </div>
  );
};
interface ContactCardProps {
  title: string;
  Icon: React.ElementType;
  content: string;
}
const ContactCard: React.FC<ContactCardProps> = ({ title, content, Icon }) => {
  return (
    <div className="p-8 text-center rounded-2xl border border-[#FFD700] border-solid flex-[1_1_45%]">
      <div className="flex justify-center">
        <Icon />
      </div>
      <h3 className="mb-4 text-xl lg:text-2xl font-bold text-[#FFD700]">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-foreground">{content}</p>
    </div>
  );
};
