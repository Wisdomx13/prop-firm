import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/app-layout";

const RefundPolicy = () => {
  return (
    <div>
      <AppLayout>
        <main className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
              REFUND POLICY
            </h1>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>

          <Card className="bg-gradient-to-r from-[#171717] to-black border-[#222] p-6 md:p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#FFD700] mb-2 lg:mb-4">
              Welcome to Prop Account, LLC
            </h2>
            <p className="text-gray-300 leading-relaxed ">
              After a cleared payment on the purchase of one of our programs
              occurs, you will receive an email with the login details to access
              your trading platform. Once this information is emailed to you, no
              refund will be given. In some special circumstances, we will
              provide a refund if there were no trades placed on the account,
              for assistance, please contact our email support. 
            </p>

            <div className="my-8">
              <Separator className="bg-gray-700" />
            </div>

            <h2 className="text-2xl font-semibold text-[#FFD700] mb-2 lg:mb-4">
              DISPUTE POLICY
            </h2>
            <p className="text-gray-300 leading-relaxed ">
              Clients who improperly dispute charges or request chargebacks with
              their bank will be permanently banned from the Platform. Please
              contact our email support if you have any questions.
            </p>

            <div className="my-8">
              <Separator className="bg-gray-700" />
            </div>

            <h2 className="text-2xl font-semibold text-[#FFD700] mb-2 lg:mb-4">
              ACCEPTANCE OF THIS POLICY
            </h2>
            <p className="text-gray-300 leading-relaxed">
              It is your responsibility to familiarize yourself with this refund
              policy. By placing an order for any of our products, you indicate
              that you have read this refund policy and that you agree with and
              fully accept the terms of this refund policy. If you do not agree
              with or fully accept the terms of this refund policy, we ask that
              you do not place an order with us. Please contact us at{" "}
              <a
                href="mailto:support@pipzen.io"
                className="text-[#FFD700] hover:underline cursor-pointer"
              >
                support@pipzen.io
              </a>{" "}
              should you have any questions regarding our refund policy.
            </p>
          </Card>
        </main>
      </AppLayout>
    </div>
  );
};

export default RefundPolicy;
