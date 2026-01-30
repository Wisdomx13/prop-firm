"use client";
import React from "react";

import AppLayout from "@/components/app-layout";

const PrivacyPolicy = () => {
  return (
    <div>
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
            TERMS AND CONDITIONS
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
        </div>

        <main className="container bg-white text-black rounded-2xl px-4 py-8 mx-auto md:px-6 md:py-12 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="prose prose-blue max-w-none">
                <section id="introduction" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Introduction
                  </h2>
                  <p className="mb-4">
                    Welcome to Pipzen. These Terms of Use govern your access to
                    and use of the Pipzen website, mobile applications, and
                    services (collectively, the &quot;Services&quot;). By
                    accessing or using our Services, you agree to be bound by
                    these Terms of Use. If you do not agree to these terms,
                    please do not use our Services.
                  </p>
                  <p>
                    Pipzen provides a platform connecting property investors,
                    real estate professionals, and individuals interested in
                    property trading and investment opportunities. Our mission
                    is to create a transparent, efficient marketplace for
                    property transactions.
                  </p>
                </section>

                <section id="acceptance" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Acceptance of Terms
                  </h2>
                  <p className="mb-4">
                    By accessing or using the Services, you acknowledge that you
                    have read, understood, and agree to be bound by these Terms
                    of Use. You also acknowledge that you agree to our Privacy
                    Policy, which is incorporated by reference into these Terms
                    of Use.
                  </p>
                  <p>
                    If you are using the Services on behalf of a company,
                    organization, or other entity, then &quot;you&quot; means
                    both you and that entity, and you represent and warrant that
                    you are authorized to bind that entity to these Terms of Use
                    and all references to &quot;you&quot; throughout these terms
                    will include that entity.
                  </p>
                </section>

                <section id="eligibility" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Eligibility
                  </h2>
                  <p className="mb-4">
                    To use the Services, you must be at least 18 years old and
                    capable of forming a binding contract with Pipzen. By using
                    the Services, you represent and warrant that you meet these
                    requirements.
                  </p>
                  <p className="mb-4">
                    If you are using the Services on behalf of a business
                    entity, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      You have the authority to bind that entity to these Terms
                      of Use
                    </li>
                    <li>The entity agrees to be bound by these Terms of Use</li>
                    <li>
                      The entity is duly organized and validly existing under
                      applicable laws
                    </li>
                  </ul>
                  <p>
                    Pipzen reserves the right to refuse service, terminate
                    accounts, or restrict access to anyone for any reason at any
                    time.
                  </p>
                </section>

                <section id="account" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Account Registration
                  </h2>
                  <p className="mb-4">
                    To access certain features of the Services, you may be
                    required to register for an account. When you register, you
                    agree to provide accurate, current, and complete information
                    about yourself as prompted by our registration form and to
                    maintain and promptly update your account information.
                  </p>
                  <p className="mb-4">You are responsible for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      Maintaining the confidentiality of your account
                      credentials
                    </li>
                    <li>All activities that occur under your account</li>
                    <li>
                      Immediately notifying Pipzen of any unauthorized use of
                      your account or any other breach of security
                    </li>
                  </ul>
                  <p>
                    Pipzen will not be liable for any loss or damage arising
                    from your failure to comply with these obligations.
                  </p>
                </section>

                <section id="services" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Services
                  </h2>
                  <p className="mb-4">
                    Pipzen provides a platform for users to discover, evaluate,
                    and engage in property-related transactions. Our Services
                    may include, but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Property listings and search functionality</li>
                    <li>Communication tools for buyers, sellers, and agents</li>
                    <li>Market analysis and property valuation tools</li>
                    <li>Transaction management services</li>
                    <li>Educational resources about property investment</li>
                  </ul>
                  <p className="mb-4">
                    Pipzen reserves the right to modify, suspend, or discontinue
                    any aspect of the Services at any time, with or without
                    notice. We may also impose limits on certain features or
                    restrict your access to parts or all of the Services without
                    liability.
                  </p>
                  <p>
                    While we strive to provide accurate information, Pipzen does
                    not guarantee the accuracy, completeness, or reliability of
                    any content available through our Services, including
                    property listings, market data, or user-generated content.
                  </p>
                </section>

                <section id="user-content" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    User Content
                  </h2>
                  <p className="mb-4">
                    Our Services may allow you to post, upload, or submit
                    content, including but not limited to property listings,
                    reviews, comments, and messages (collectively, &quot;User
                    Content&quot;). You retain ownership rights in your User
                    Content, but you grant Pipzen a worldwide, non-exclusive,
                    royalty-free license to use, reproduce, modify, adapt,
                    publish, translate, distribute, and display such User
                    Content in connection with providing and promoting the
                    Services.
                  </p>
                  <p className="mb-4">You represent and warrant that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      You own or have the necessary rights to your User Content
                    </li>
                    <li>
                      Your User Content does not infringe upon the intellectual
                      property rights of any third party
                    </li>
                    <li>
                      Your User Content does not violate any applicable laws or
                      regulations
                    </li>
                    <li>Your User Content is accurate and not misleading</li>
                  </ul>
                  <p>
                    Pipzen reserves the right to review, remove, or modify User
                    Content at our sole discretion, without notice, particularly
                    if it violates these Terms of Use or applicable laws.
                  </p>
                </section>

                <section id="prohibited" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Prohibited Activities
                  </h2>
                  <p className="mb-4">
                    You agree not to engage in any of the following prohibited
                    activities:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      Violating any applicable laws, regulations, or third-party
                      rights
                    </li>
                    <li>
                      Posting false, misleading, or fraudulent information
                    </li>
                    <li>Impersonating any person or entity</li>
                    <li>
                      Interfering with or disrupting the Services or servers or
                      networks connected to the Services
                    </li>
                    <li>
                      Attempting to gain unauthorized access to any part of the
                      Services
                    </li>
                    <li>
                      Using the Services for any illegal or unauthorized purpose
                    </li>
                    <li>Collecting user information without their consent</li>
                    <li>
                      Posting content that is defamatory, obscene, or otherwise
                      objectionable
                    </li>
                    <li>
                      Transmitting viruses, malware, or other malicious code
                    </li>
                    <li>
                      Engaging in any activity that could disable, overburden,
                      or impair the Services
                    </li>
                  </ul>
                  <p>
                    Violation of these prohibitions may result in termination of
                    your access to the Services and potential legal action.
                  </p>
                </section>

                <section id="intellectual" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Intellectual Property
                  </h2>
                  <p className="mb-4">
                    The Services and all content, features, and functionality
                    thereof, including but not limited to text, graphics, logos,
                    icons, images, audio clips, digital downloads, data
                    compilations, software, and the design, selection, and
                    arrangement thereof, are owned by Pipzen, its licensors, or
                    other providers and are protected by copyright, trademark,
                    patent, trade secret, and other intellectual property laws.
                  </p>
                  <p className="mb-4">
                    These Terms of Use do not grant you any right, title, or
                    interest in the Services or any content, features, or
                    functionality thereof. You may not reproduce, distribute,
                    modify, create derivative works of, publicly display,
                    publicly perform, republish, download, store, or transmit
                    any material from our Services, except as follows:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      Your computer may temporarily store copies of materials
                      for ordinary browsing purposes
                    </li>
                    <li>
                      You may print or download one copy of a reasonable number
                      of pages for your personal, non-commercial use
                    </li>
                    <li>
                      You may share content on social media platforms if
                      provided with sharing functionality
                    </li>
                  </ul>
                  <p>
                    Any use of the Services not expressly permitted by these
                    Terms of Use is a breach of these Terms of Use and may
                    violate copyright, trademark, and other laws.
                  </p>
                </section>

                <section id="disclaimers" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Disclaimers
                  </h2>
                  <p className="mb-4">
                    THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND
                    &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF
                    ANY KIND, EITHER EXPRESS OR IMPLIED. Pipzen EXPRESSLY
                    DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED,
                    STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
                    WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS
                    FOR A PARTICULAR PURPOSE.
                  </p>
                  <p className="mb-4">Pipzen does not warrant that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The Services will meet your requirements</li>
                    <li>
                      The Services will be uninterrupted, timely, secure, or
                      error-free
                    </li>
                    <li>
                      The results obtained from using the Services will be
                      accurate or reliable
                    </li>
                    <li>Any errors in the Services will be corrected</li>
                  </ul>
                  <p className="mb-4">
                    Pipzen is not a real estate broker, agent, or financial
                    advisor. We do not provide real estate, legal, financial, or
                    tax advice. Any information provided through the Services is
                    for general informational purposes only.
                  </p>
                  <p>
                    You acknowledge that you may be exposed to content that is
                    inaccurate, offensive, indecent, or objectionable, and you
                    waive any legal or equitable rights or remedies you may have
                    against Pipzen with respect to such content.
                  </p>
                </section>

                <section id="limitation" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, Pipzen
                    AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES,
                    AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                    INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
                    GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      Your access to or use of or inability to access or use the
                      Services
                    </li>
                    <li>
                      Any conduct or content of any third party on the Services
                    </li>
                    <li>Any content obtained from the Services</li>
                    <li>
                      Unauthorized access, use, or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                  <p className="mb-4">
                    IN NO EVENT SHALL Pipzen&apos;S TOTAL LIABILITY TO YOU FOR
                    ALL CLAIMS RELATING TO THE SERVICES EXCEED THE AMOUNT PAID
                    BY YOU TO Pipzen, IF ANY, FOR ACCESSING OR USING THE
                    SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE CLAIM.
                  </p>
                  <p>
                    SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION
                    OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE
                    ABOVE LIMITATION MAY NOT APPLY TO YOU.
                  </p>
                </section>

                <section id="indemnification" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Indemnification
                  </h2>
                  <p className="mb-4">
                    You agree to defend, indemnify, and hold harmless Pipzen,
                    its officers, directors, employees, agents, affiliates, and
                    licensors from and against any claims, liabilities, damages,
                    judgments, awards, losses, costs, expenses, or fees
                    (including reasonable attorneys&apos; fees) arising out of
                    or relating to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Your violation of these Terms of Use</li>
                    <li>Your User Content</li>
                    <li>Your use of the Services</li>
                    <li>Your violation of any rights of another</li>
                  </ul>
                  <p>
                    This indemnification obligation will survive these Terms of
                    Use and your use of the Services.
                  </p>
                </section>

                <section id="termination" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Termination
                  </h2>
                  <p className="mb-4">
                    Pipzen may terminate or suspend your access to all or part
                    of the Services, with or without notice, for any reason,
                    including, without limitation, if Pipzen believes that you
                    have violated or acted inconsistently with the letter or
                    spirit of these Terms of Use.
                  </p>
                  <p className="mb-4">
                    You may terminate your account at any time by contacting us
                    or using the account deletion feature if available. Upon
                    termination, your right to use the Services will immediately
                    cease.
                  </p>
                  <p>
                    All provisions of these Terms of Use that by their nature
                    should survive termination shall survive termination,
                    including, without limitation, ownership provisions,
                    warranty disclaimers, indemnity, and limitations of
                    liability.
                  </p>
                </section>

                <section id="governing-law" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Governing Law
                  </h2>
                  <p className="mb-4">
                    These Terms of Use and any disputes arising out of or
                    related to these Terms of Use or the Services shall be
                    governed by and construed in accordance with the laws of
                    [Jurisdiction], without regard to its conflict of law
                    principles.
                  </p>
                  <p className="mb-4">
                    Any legal action or proceeding arising out of or relating to
                    these Terms of Use or the Services shall be brought
                    exclusively in the courts located in [Jurisdiction], and you
                    consent to the personal jurisdiction and venue of such
                    courts.
                  </p>
                  <p>
                    If any provision of these Terms of Use is found to be
                    invalid or unenforceable, the remaining provisions shall
                    remain in full force and effect.
                  </p>
                </section>

                <section id="changes" className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">
                    Changes to Terms
                  </h2>
                  <p className="mb-4">
                    Pipzen reserves the right to modify or replace these Terms
                    of Use at any time at our sole discretion. If a revision is
                    material, we will provide at least 30 days&apos; notice
                    prior to any new terms taking effect. What constitutes a
                    material change will be determined at our sole discretion.
                  </p>
                  <p className="mb-4">
                    By continuing to access or use our Services after any
                    revisions become effective, you agree to be bound by the
                    revised terms. If you do not agree to the new terms, you are
                    no longer authorized to use the Services.
                  </p>
                  <p>
                    It is your responsibility to review these Terms of Use
                    periodically for changes. The most current version will
                    always be available on our website.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  );
};

export default PrivacyPolicy;
