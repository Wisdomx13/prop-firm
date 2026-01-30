import React from "react";
export const metadata = {
  title: "Sign In | Pipzen Prop Firm - Access Your Trading Account",
  description:
    "Sign in to your Pipzen account to manage your funded account, track your trades, and access our prop firm trading programs. Secure login for forex, crypto, and indices traders.",
  keywords: [
    "sign in Pipzen",
    "prop firm account login",
    "Pipzen trading login",
    "funded account sign in",
    "forex trading account sign in",
    "crypto account login Pipzen",
    "Pipzen member login",
    "sign in prop trading",
    "log into Pipzen",
  ],
  openGraph: {
    title: "Sign In | Pipzen Prop Firm - Access Your Trading Account",
    description:
      "Log in to your Pipzen account to start trading or manage your funded account. Secure access to forex, crypto, and indices trading.",
    url: "https://www.pipzen.io/signin",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-signin.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Sign In",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/signin",
  },
};
const SigninLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default SigninLayout;
