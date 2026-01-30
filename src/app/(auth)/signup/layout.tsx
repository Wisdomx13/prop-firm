import React from "react";
export const metadata = {
  title: "Sign Up | Join Pipzen Prop Firm - Get Funded & Start Trading",
  description:
    "Sign up for Pipzen’s prop firm and start your journey with a funded account. Get access to forex, crypto, and indices trading with high profit splits and no evaluation.",
  keywords: [
    "sign up Pipzen",
    "Pipzen prop firm registration",
    "prop trading sign up",
    "sign up for funded account",
    "Pipzen trading registration",
    "create Pipzen account",
    "prop firm account sign up",
    "join Pipzen",
    "sign up forex crypto trading",
  ],
  openGraph: {
    title: "Sign Up | Join Pipzen Prop Firm - Get Funded & Start Trading",
    description:
      "Register with Pipzen and start trading with a funded account. Access forex, crypto, and indices markets with no evaluation and high profit splits.",
    url: "https://www.pipzen.io/sign-up",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-sign-up.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Sign Up",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/sign-up",
  },
};
const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default SignupLayout;
