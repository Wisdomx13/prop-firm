"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AppLayout from "@/components/app-layout";

const PrivacyPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <AppLayout>
        <div className="text-center pt-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
            PRIVACY POLICY
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
        </div>

        <main className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Table of Contents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ol className="list-decimal list-inside space-y-2 text-blue-600">
                    <li>
                      <a
                        href="#introduction"
                        className="hover:underline cursor-pointer"
                      >
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a
                        href="#information-collection"
                        className="hover:underline cursor-pointer"
                      >
                        Information We Collect
                      </a>
                    </li>
                    <li>
                      <a
                        href="#information-use"
                        className="hover:underline cursor-pointer"
                      >
                        How We Use Your Information
                      </a>
                    </li>
                    <li>
                      <a
                        href="#information-sharing"
                        className="hover:underline cursor-pointer"
                      >
                        Information Sharing and Disclosure
                      </a>
                    </li>
                    <li>
                      <a
                        href="#cookies"
                        className="hover:underline cursor-pointer"
                      >
                        Cookies and Tracking Technologies
                      </a>
                    </li>
                  </ol>
                </div>
                <div>
                  <ol
                    className="list-decimal list-inside space-y-2 text-blue-600"
                    start={6}
                  >
                    <li>
                      <a
                        href="#data-security"
                        className="hover:underline cursor-pointer"
                      >
                        Data Security
                      </a>
                    </li>
                    <li>
                      <a
                        href="#user-rights"
                        className="hover:underline cursor-pointer"
                      >
                        Your Rights and Choices
                      </a>
                    </li>
                    <li>
                      <a
                        href="#international-transfers"
                        className="hover:underline cursor-pointer"
                      >
                        International Data Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#children"
                        className="hover:underline cursor-pointer"
                      >
                        Children&rsquo;s Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#changes"
                        className="hover:underline cursor-pointer"
                      >
                        Changes to This Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="hover:underline cursor-pointer"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Policy Content */}
            <ScrollArea className="p-6 h-full">
              <div className="space-y-8">
                <section id="introduction" className="pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Pipzen is committed to protecting your privacy. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard
                    your information when you visit our website tradexprop.com
                    (the &quot;Site&quot;) or use our services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We value your trust and strive to be transparent about our
                    data practices. Please read this privacy policy carefully.
                    If you do not agree with the terms of this privacy policy,
                    please do not access the site.
                  </p>
                  <p className="text-gray-700">
                    We reserve the right to make changes to this Privacy Policy
                    at any time and for any reason. We will alert you about any
                    changes by updating the &quot;Last Updated&quot; date of
                    this Privacy Policy. You are encouraged to periodically
                    review this Privacy Policy to stay informed of updates.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="information-collection"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Information We Collect
                  </h2>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"personal-information"}
                  >
                    <AccordionItem value="personal-information">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        2.1 Personal Information
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-4">
                          We may collect personal information that you
                          voluntarily provide to us when you register on the
                          Site, express interest in obtaining information about
                          us or our products and services, participate in
                          activities on the Site, or otherwise contact us.
                        </p>
                        <p className="text-gray-700 mb-4">
                          The personal information we collect may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>
                            Name and contact details (such as email address,
                            phone number, mailing address)
                          </li>
                          <li>
                            Account credentials (such as username and password)
                          </li>
                          <li>
                            Profile information (such as profile picture, job
                            title, company)
                          </li>
                          <li>
                            Payment information (such as credit card details,
                            billing address)
                          </li>
                          <li>Communication preferences</li>
                          <li>Any other information you choose to provide</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"automatic-information"}
                    className="mt-4"
                  >
                    <AccordionItem value="automatic-information">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        2.2 Information Automatically Collected
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-4">
                          When you visit our Site, we automatically collect
                          certain information about your device, browsing
                          actions, and patterns. This information may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>
                            Device information (such as your IP address, browser
                            type, operating system)
                          </li>
                          <li>
                            Usage data (such as pages visited, time spent on
                            those pages, referring website addresses)
                          </li>
                          <li>
                            Location information (such as general location
                            derived from IP address)
                          </li>
                          <li>
                            Device settings (such as language preference, time
                            zone)
                          </li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                          This information is collected using cookies, web
                          beacons, and other tracking technologies. For more
                          information about our use of cookies, please see the
                          &quot;Cookies and Tracking Technologies&quot; section
                          below.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="information-use"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may use the information we collect about you for various
                    purposes, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>
                      To provide, maintain, and improve our Site and services
                    </li>
                    <li>
                      To process and complete transactions, and send related
                      information including confirmations and invoices
                    </li>
                    <li>
                      To respond to your comments, questions, and requests, and
                      provide customer service
                    </li>
                    <li>
                      To send administrative information, such as updates to our
                      terms, conditions, and policies
                    </li>
                    <li>
                      To personalize your experience on our Site and deliver
                      content relevant to your interests
                    </li>
                    <li>
                      To monitor and analyze trends, usage, and activities in
                      connection with our Site
                    </li>
                    <li>
                      To detect, prevent, and address technical issues, fraud,
                      or illegal activity
                    </li>
                    <li>
                      To comply with legal obligations and enforce our legal
                      rights
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    We may also use your information for marketing purposes,
                    such as sending you promotional emails about our products,
                    services, or other information we think you may find
                    interesting. You may opt out of receiving marketing
                    communications from us by following the unsubscribe
                    instructions included in our marketing communications.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="information-sharing"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Information Sharing and Disclosure
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may share your information in the following situations:
                  </p>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"third-party-service"}
                  >
                    <AccordionItem value="third-party-service">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        4.1 Third-Party Service Providers
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          We may share your information with third-party
                          vendors, service providers, contractors, or agents who
                          perform services for us or on our behalf and require
                          access to such information to do that work. Examples
                          include payment processing, data analysis, email
                          delivery, hosting services, customer service, and
                          marketing efforts. These third parties are only
                          permitted to use your personal information to the
                          extent necessary to perform these services on our
                          behalf and are required to maintain the
                          confidentiality and security of your information.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"business-transfers"}
                    className="mt-4"
                  >
                    <AccordionItem value="business-transfers">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        4.2 Business Transfers
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          If we are involved in a merger, acquisition, financing
                          due diligence, reorganization, bankruptcy,
                          receivership, sale of company assets, or transition of
                          service to another provider, your information may be
                          transferred as part of such a transaction as permitted
                          by law and/or contract. We cannot promise that an
                          acquiring party or the merged entity will have the
                          same privacy practices or treat your information the
                          same as described in this Privacy Policy.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"legal-requirements"}
                    className="mt-4"
                  >
                    <AccordionItem value="legal-requirements">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        4.3 Legal Requirements
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          We may disclose your information where we are legally
                          required to do so in order to comply with applicable
                          law, governmental requests, a judicial proceeding,
                          court order, or legal process, such as in response to
                          a court order or a subpoena (including in response to
                          public authorities to meet national security or law
                          enforcement requirements).
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"vital-interests"}
                    className="mt-4"
                  >
                    <AccordionItem value="vital-interests">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        4.4 Vital Interests and Legal Rights
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          We may disclose your information where we believe it
                          is necessary to investigate, prevent, or take action
                          regarding potential violations of our policies,
                          suspected fraud, situations involving potential
                          threats to the safety of any person and illegal
                          activities, or as evidence in litigation in which we
                          are involved.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"consent"}
                    className="mt-4"
                  >
                    <AccordionItem value="consent">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        4.5 With Your Consent
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          We may share your information with your consent or at
                          your direction. For example, if you choose to share
                          your information with other users of our services or
                          third-party services that integrate with our services.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="cookies"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We and our third-party service providers use cookies, web
                    beacons, and other tracking technologies to track
                    information about your use of our Site. We may combine this
                    information with other personal information we collect from
                    you.
                  </p>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"cookies-types"}
                  >
                    <AccordionItem value="cookies-types">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        5.1 Types of Cookies
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-4">
                          We use the following types of cookies:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>
                            <strong>Essential Cookies:</strong> These cookies
                            are necessary for the Site to function properly and
                            cannot be switched off in our systems. They are
                            usually only set in response to actions made by you
                            which amount to a request for services, such as
                            setting your privacy preferences, logging in, or
                            filling in forms.
                          </li>
                          <li>
                            <strong>Performance Cookies:</strong> These cookies
                            allow us to count visits and traffic sources so we
                            can measure and improve the performance of our Site.
                            They help us to know which pages are the most and
                            least popular and see how visitors move around the
                            Site.
                          </li>
                          <li>
                            <strong>Functional Cookies:</strong> These cookies
                            enable the Site to provide enhanced functionality
                            and personalization. They may be set by us or by
                            third-party providers whose services we have added
                            to our pages.
                          </li>
                          <li>
                            <strong>Targeting Cookies:</strong> These cookies
                            may be set through our Site by our advertising
                            partners. They may be used by those companies to
                            build a profile of your interests and show you
                            relevant advertisements on other sites.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={"cookie-control"}
                    className="mt-4"
                  >
                    <AccordionItem value="cookie-control">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800">
                        5.2 Your Cookie Choices
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-4">
                          Most web browsers are set to accept cookies by
                          default. If you prefer, you can usually choose to set
                          your browser to remove or reject browser cookies.
                          Please note that if you choose to remove or reject
                          cookies, this could affect the availability and
                          functionality of our Site.
                        </p>
                        <p className="text-gray-700">
                          For more information about cookies and how to disable
                          them, you can consult the information provided by the
                          Interactive Advertising Bureau at{" "}
                          <a
                            href="https://www.allaboutcookies.org"
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            www.allaboutcookies.org
                          </a>
                          .
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="data-security"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Data Security
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We have implemented appropriate technical and organizational
                    security measures designed to protect the security of any
                    personal information we process. However, despite our
                    safeguards and efforts to secure your information, no
                    electronic transmission over the Internet or information
                    storage technology can be guaranteed to be 100% secure, so
                    we cannot promise or guarantee that hackers, cybercriminals,
                    or other unauthorized third parties will not be able to
                    defeat our security and improperly collect, access, steal,
                    or modify your information.
                  </p>
                  <p className="text-gray-700">
                    We will make any legally required disclosures of any breach
                    of the security, confidentiality, or integrity of your
                    unencrypted electronically stored &rdquo;personal data&quot;
                    (as defined in applicable state statutes on security breach
                    notification) to you via email or conspicuous posting on the
                    Site without unreasonable delay, insofar as consistent with
                    (i) the legitimate needs of law enforcement or (ii) any
                    measures necessary to determine the scope of the breach and
                    restore the reasonable integrity of the data system.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="user-rights"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Your Rights and Choices
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Depending on your location, you may have certain rights
                    regarding your personal information. These may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>
                      <strong>Right to Access:</strong> You may request a copy
                      of the personal information we hold about you.
                    </li>
                    <li>
                      <strong>Right to Rectification:</strong> You may request
                      that we correct any inaccurate or incomplete personal
                      information we hold about you.
                    </li>
                    <li>
                      <strong>Right to Erasure:</strong> You may request that we
                      delete your personal information in certain circumstances.
                    </li>
                    <li>
                      <strong>Right to Restrict Processing:</strong> You may
                      request that we restrict the processing of your personal
                      information in certain circumstances.
                    </li>
                    <li>
                      <strong>Right to Data Portability:</strong> You may
                      request to receive your personal information in a
                      structured, commonly used, and machine-readable format.
                    </li>
                    <li>
                      <strong>Right to Object:</strong> You may object to our
                      processing of your personal information in certain
                      circumstances.
                    </li>
                    <li>
                      <strong>Right to Withdraw Consent:</strong> If we rely on
                      your consent to process your personal information, you
                      have the right to withdraw that consent at any time.
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    To exercise any of these rights, please contact us using the
                    contact information provided below. We will respond to your
                    request within a reasonable timeframe and in accordance with
                    applicable laws.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="international-transfers"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. International Data Transfers
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Our operations are supported by a network of computers,
                    cloud-based servers, and other infrastructure and
                    information technology, including, but not limited to,
                    third-party service providers. We and our third-party
                    service providers store and process your personal
                    information in the United States and elsewhere in the world.
                  </p>
                  <p className="text-gray-700">
                    If you are located in the European Economic Area, United
                    Kingdom, or other regions with laws governing data
                    collection and use that may differ from U.S. law, please
                    note that we may transfer information, including personal
                    information, to a country and jurisdiction that does not
                    have the same data protection laws as your jurisdiction. By
                    using the Site, you consent to the transfer of information
                    to the U.S. or to any other country in which we or our
                    parent, subsidiaries, affiliates, or service providers
                    maintain facilities and the use and disclosure of
                    information about you as described in this Privacy Policy.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="children"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Children&lsquo;s Privacy
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Our Site is not intended for individuals under the age of
                    18. We do not knowingly collect personal information from
                    children under 18. If you are a parent or guardian and you
                    are aware that your child has provided us with personal
                    information, please contact us. If we become aware that we
                    have collected personal information from children without
                    verification of parental consent, we will take steps to
                    remove that information from our servers.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>

                <section
                  id="changes"
                  className="pb-6 border-t border-gray-200 pt-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    10. Changes to This Privacy Policy
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. The
                    updated version will be indicated by an updated &quot;Last
                    Updated&quot; date and the updated version will be effective
                    as soon as it is accessible. If we make material changes to
                    this Privacy Policy, we may notify you either by prominently
                    posting a notice of such changes or by directly sending you
                    a notification. We encourage you to review this Privacy
                    Policy frequently to be informed of how we are protecting
                    your information.
                  </p>
                  <div className="mt-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToTop}
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-arrow-up mr-2"></i> Back to Top
                    </Button>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>
        </main>
      </AppLayout>
    </div>
  );
};

export default PrivacyPolicy;
