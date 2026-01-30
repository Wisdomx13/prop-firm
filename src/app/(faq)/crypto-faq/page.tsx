import AppLayout from "@/components/app-layout";
import FaqTab from "@/components/faq/faq-tab";
import Hero from "@/components/faq/hero";
import { Metadata } from "next";
import React from "react";

import { Contact } from "../../../../data/page/contact";

export const metadata: Metadata = {
  title: "Crypto FAQ | Pipzen Prop Firm Crypto Trading Questions & Answers",
  description:
    "Find answers to all your crypto trading questions at Pipzen. Learn about crypto trading rules, profit splits, supported cryptocurrencies, and funded account policies in our Crypto FAQ.",
  keywords: [
    "crypto FAQ Pipzen",
    "crypto trading questions",
    "prop firm crypto rules",
    "crypto funded account FAQ",
    "prop firm crypto guidelines",
    "trading crypto on prop firm",
    "crypto profit split rules",
    "crypto evaluation FAQs",
    "Pipzen crypto trading info",
    "crypto prop trading FAQ",
  ],
  openGraph: {
    title: "Crypto FAQ | Pipzen Prop Firm Crypto Trading Questions & Answers",
    description:
      "Browse Pipzen’s Crypto FAQ section to get answers about trading crypto on funded accounts, profit splits, allowed cryptocurrencies, and prop firm crypto guidelines.",
    url: "https://www.pipzen.io/crypto-faq",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-crypto-faq.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Crypto FAQ",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/crypto-faq",
  },
};

const CryptoFaq = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <Hero
            subtitle="RADEXPROP HELPDESK"
            title1="Frequently Asked Questions"
            title2="Crypto FAQ"
            buttonPrimary={{
              label: "GET Started",
              link: "/challenges",
            }}
            buttonScondary={{
              label: "Join Our Community",
              link: `${Contact.discord}`,
            }}
          />
          <FaqTab
            faqCateogies={[
              {
                category: "Trading Rules",
                faq: [
                  {
                    question: "How do you calculate the Daily Loss Limit?",
                    answer:
                      "The Daily Loss Limit is the maximum your account can lose in any given day. Daily Loss Limit is calculated using the previous day balance which resets at 5 PM EST. The Daily Stop compounds with the increase in your account. Example: if your prior day’s end of day balance (5pm EST) was $100,000, your account would violate the daily stop loss limit if your equity reached $95,000 during the day. If your floating equity is +$5,000 on a $100,000 account, your new-day (5pm EST) max loss is based on your balance from the previous day ($100,000). So, your daily loss limit would still be $95,000.",
                  },
                  {
                    question: "How do you calculate the Max Drawdown (STATIC)?",
                    answer:
                      "Maximum drawdown is the maximum your account can drawdown before you would hard breach your account. When you open the account, your Maximum Drawdown is set at a defined % of your starting balance. This % is static and does not trail.",
                  },
                  {
                    question: "Is there a breach for inactivity?",
                    answer:
                      "Yes. We will consider you inactive and your account will be breached if you do not have any trading activity on your account for 30 consecutive days.",
                  },
                  {
                    question: "Can I hold positions over weekend?",
                    answer: "Positions can be held over the weekend.",
                  },
                  {
                    question: "Can i trade during news events?",
                    answer:
                      "Opening a position within 3 minutes before or after a News Event is prohibited. Any traders identified as having opened a position during a News Event are subject to having that position closed and the associated P&L removed from their account, having the leverage on their account reduced or having their account breached altogether. The Company has sole and absolute discretion in determining what constitutes a News Event. This rule is intended to protect the integrity of our program and is not meant to penalize traders who inadvertently trade through a news event.",
                  },
                ],
              },
              {
                category: "Funded Account",
                faq: [
                  {
                    question:
                      "Once I pass the Evaluation, am I provided with a demo or live account?",
                    answer:
                      "Once you pass the Evaluation, we provide you with a Funded account, backed by our capital. The capital in your Funded Account is notional and may not match the amount of capital on deposit with the Liquidity Provider. A Funded Account is notionally-funded when actual funds in the account (i.e., the equity in a Funded Account represented by the amount of capital) differs from the nominal account size (i.e., the size of the Funded Account that establishes the initial account value and level of trading). Notional funds are the difference between nominal account size and actual capital in a Funded Account. Use of notional funding does not impact your trading conditions in any way.",
                  },
                  {
                    question:
                      "How Long does it take to receive my Funded Account?",
                    answer:
                      "Upon passing your Evaluation, you will receive an email with instructions on how to access and complete both your “Know Your Customer” verification and your “Trader Agreement”. Once both are completed and supporting documentation is provided, your Funded Account will be created, funded and issued to you typically within 24-48 business hours. You will receive a confirmation email once this account is being enabled.",
                  },
                  {
                    question:
                      "How do I withdraw the gains in my Funded Account?",
                    answer:
                      "Traders can request a withdrawal of the gains in their Funded account at any time in their trader dashboard, but no more frequently than once per thirty (30) days. So, if you make gains in your Funded account, you can request a withdrawal. When you are ready to withdraw the gains from your Funded account, click the Withdraw Profits button in your trader dashboard and enter the amount to withdraw. All such gains are distributed via the available outbound payment solutions offered from time to time. Once your withdrawal request is approved, we will pay the monies owed to you. We reserve the right to change the withdrawal methods and options at any time.",
                  },
                  {
                    question: "What are the rules for the Funded Account?",
                    answer:
                      "The rules for the Funded Account are exactly the same as your Evaluation account. However, with a Funded Account, there is no profit target.",
                  },
                  {
                    question: "Am I subject to any position limits?",
                    answer:
                      "The maximum position that you may open is determined by your available margin. We reserve the right to increase the margin requirement, limit the number of open positions you may enter or maintain in the Funded Account at any time, and to revise in response to market conditions the drawdown levels at which trading in the Funded Account will be halted. We or the Broker reserve the right to refuse to accept any order.",
                  },

                  {
                    question:
                      "When can I withdraw the gains in my Funded Account and does that affect my Maximum Drawdown?",
                    answer:
                      "Your first withdrawal can be requested at any time. Thereafter, you can request a withdrawal of the gains in your account every 30 days. When a withdrawal is approved, we will also withdraw our share of the gains, and your max drawdown will remain unaffected. The drawdown does not reset when you request a withdrawal.",
                  },
                  {
                    question:
                      "Do we manipulate the pricing or executions you receive in your Funded Account?",
                    answer:
                      "No. We do not have any control over pricing from the liquidity provider or on the executions on your trades.",
                  },
                  {
                    question: "Who is the counterparty to my trades?",
                    answer:
                      "For purposes of managing risk and minimizing transaction costs, we may offset or negate market risk and act as the direct counterparty to certain trades initiated in the Account. Such trades are executed at prices provided by arm’s length third parties. This framework is intended to ensure you receive real market execution on your trades, while simultaneously allowing us to manage risk dynamically by routing existing positions or future orders to third parties for execution as we deem appropriate. We believe that such real market execution and dynamic risk management would not be possible or as cost-effective if trades were executed in simulated accounts. Regardless of whether we act as counterparty to your trades, the gain or loss on your funded account is not calculated differently. However, when we act as the counterparty to your trades, there is an inherent potential conflict of interest because your trades do not result in net gain or loss to us, as your trades would if we were not the direct counterparty.",
                  },
                ],
              },
              {
                category: "General Questions",
                faq: [
                  {
                    question: "Can I trade during News Events?",
                    answer:
                      "Opening a position within 3 minutes before or after a News Event is prohibited. Any traders identified as having opened a position during a News Event are subject to having that position closed and the associated P&L removed from their account, having the leverage on their account reduced or having their account breached altogether. The Company has sole and absolute discretion in determining what constitutes a News Event. This rule is intended to protect the integrity of our program and is not meant to penalize traders who inadvertently trade through a news event.",
                  },
                  {
                    question: "Where do I track the progress of my account?",
                    answer:
                      "Upon purchasing an Evaluation, you will receive access to a trader dashboard where you can monitor your Evaluation and Funded Accounts. The dashboard is updated every time we calculate metrics, which occurs roughly every 60 seconds. It is your responsibility to monitor your breach levels.",
                  },
                  {
                    question:
                      "Do I have to use one of your accounts for the Evaluation or can I use my own?",
                    answer:
                      "We have risk management software that is synced with the accounts we create. This allows us to analyze your performance in real time for achievements or rule violations. As such, you must use an account that we provide to you.",
                  },
                  {
                    question: "What Platform can I trade on?",
                    answer:
                      "Our technology is independently integrated with DXtrade, MatchTrader, and cTrader platforms via GooeyTrade.",
                  },
                  {
                    question: "What products can I trade?",
                    answer:
                      "You can trade any products streamed by the Liquidity Provider into the available platforms, as such products may change from time to time. This includes FX pairs and CFD Indices, Commodities, Metals, and Cryptocurrencies.",
                  },
                  {
                    question: "What is the leverage?",
                    answer:
                      "We offer up to 50:1 leverage on Forex and Metals, up to 10:1 leverage on Indices, up to 5:1 leverage on Oil and up to 2:1 leverage on Cryptocurrencies.",
                  },

                  {
                    question: "Can I use an Automated Strategy?",
                    answer:
                      "Subject to our policy on Prohibited Trading as described below, you can trade using an automated strategy.",
                  },
                  {
                    question: "Do your accounts charge commissions?",
                    answer:
                      "Funded accounts receive the same pricing and commissions as charged by our Liquidity Provider to other, self-funded, retail trading accounts.",
                  },
                  {
                    question: "How are taxes handled?",
                    answer:
                      "When trading a Funded Account for our firm, you are treated as an independent contractor. As a result, you are responsible for any and all taxes on your gains.",
                  },
                  {
                    question: "How are affiliates credited?",
                    answer:
                      "Affiliates are credited for referrals when a user creates an account using a link or discount code provided by the Affiliate.",
                  },
                  {
                    question: "Is the evaluation fee refundable?",
                    answer: "No refunds are offered.",
                  },
                  {
                    question: "Maximum Evaluation Limits",
                    answer:
                      "A maximum of $1 million in active evaluation plans per person is permitted. This can be composed of multiple assessments.",
                  },
                  {
                    question: "Commissions and Fees",
                    answer:
                      "Commissions or commission-equivalents may be charged in connection with your trading activity. Rates and methods of application can vary by asset class and are determined by our liquidity providers, and may be adjusted periodically to reflect market conditions. In addition, it’s important to note that positions held overnight may incur swap rates. These rates vary by asset class and are subject to change.",
                  },
                  {
                    question: "Margin",
                    answer:
                      "While our current leverages and margin requirements are fixed, we reserve the right to implement tiered or variable margin requirements at our discretion, and such changes may be made without prior notice.",
                  },
                  {
                    question: "How will I see the charge on my Statement?",
                    answer:
                      "Charges come across in the name of dashboardanalytix.com.",
                  },
                  {
                    question:
                      "What is the minimum age I must be to be part of your program?",
                    answer:
                      "You must be at least 18 years of age, or the applicable minimum legal age in your country, to purchase an Evaluation.",
                  },
                  {
                    question: "What Countries are accepted?",
                    answer:
                      "Subject to compliance with applicable laws and regulations, traders from all countries, excluding OFAC-listed countries, can take part in our program, unless otherwise limited at the Company’s discretion.",
                  },
                ],
              },
            ]}
          />
        </main>
      </AppLayout>
    </div>
  );
};

export default CryptoFaq;
