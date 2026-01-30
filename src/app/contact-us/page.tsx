import AppLayout from "@/components/app-layout";
import ContactForm from "@/components/contact-us/contact-form";
import ContactHero from "@/components/contact-us/hero";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Pipzen | Get in Touch with Our Prop Firm Support Team",
  description:
    "Need assistance or have a question about Pipzen’s programs? Contact our support team for instant help regarding funded accounts, trading challenges, or affiliate partnerships.",
  keywords: [
    "contact Pipzen",
    "Pipzen support",
    "prop firm customer service",
    "funded trading account help",
    "contact forex prop firm",
    "Pipzen email support",
    "trading challenge support",
    "affiliate support Pipzen",
    "prop firm live chat",
    "get in touch with Pipzen",
  ],
  openGraph: {
    title: "Contact Pipzen | Reach Our Support Team Anytime",
    description:
      "Have a question about Pipzen or our trading programs? Contact our support team for quick assistance on funded accounts, challenges, or affiliate inquiries.",
    url: "https://www.pipzen.io/contact-us",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-contact.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Contact Pipzen Support Team",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/contact-us",
  },
};

const Contact = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <ContactHero />
          <ContactForm />
        </main>
      </AppLayout>
    </div>
  );
};

export default Contact;
