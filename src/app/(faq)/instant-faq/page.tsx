import AppLayout from "@/components/app-layout";
import FaqTab from "@/components/faq/faq-tab";
import Hero from "@/components/faq/hero";
import React from "react";

export const metadata = {
  title: "Instant FAQ | Pipzen Instant Funded Program Questions & Answers",
  description:
    "Get answers to all your questions about the Pipzen Instant Funded Program. Learn about eligibility, funding amounts, trading rules, profit splits, and how to start trading instantly.",
  keywords: [
    "Instant Funded FAQ",
    "Pipzen instant funded account",
    "instant funded program questions",
    "instant funded trading FAQ",
    "how to get instant funding",
    "instant funding forex crypto FAQ",
    "Pipzen funded account FAQ",
    "instant funded crypto trading",
    "trading instantly funded account",
    "instant funding program FAQ",
  ],
  openGraph: {
    title: "Instant FAQ | Pipzen Instant Funded Program Questions & Answers",
    description:
      "Browse Pipzen’s Instant FAQ to get answers about eligibility, instant funding, profit splits, and how to trade with your funded account without any delays.",
    url: "https://www.pipzen.io/instant-faq",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-instant-faq.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Instant Funded FAQ",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/instant-faq",
  },
};

const InstantFaq = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <Hero
            subtitle="RADEXPROP HELPDESK"
            title1="Frequently Asked Questions"
            title2="Instant FAQ"
            buttonPrimary={{
              label: "GET Started",
              link: "/challenges",
            }}
            buttonScondary={{
              label: "Join Our Community",
              link: "#",
            }}
          />
          <FaqTab
            faqCateogies={[
              {
                category: "Trading Rules",
                faq: [
                  {
                    question:
                      "What is the difference between a Hard Breach and Soft Breach rule?",
                    answer:
                      "Soft breach means that we will close all trades that have violated the rule. However, you can continue trading in your Instant Funded Account. Hard breach means that you violated the Daily Loss Limit or Max Drawdown rule, or Inactivity rule. These rules constitute a hard breach. In the event you have a hard breach, you will have your Funded Account taken away.",
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
                  {
                    question: "Must I place a stop loss on trades?",
                    answer: "No",
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
                    question: "What is the Instant Funding Plan?",
                    answer:
                      "The Instant Funding Plan allows traders to start with a fully funded account without needing to complete an assessment phase.",
                  },
                  {
                    question:
                      "How Long does it take to receive my Instant Funded Account?",
                    answer:
                      "Upon completion of payment, we provide you with an Instant Funding account, backed by our capital.   You will receive an email with instructions on how to access this account on the platform you chose at checkout.The capital in your Funded Account is notional and may not match the amount of capital on deposit with the Broker. A Funded Account is notionally funded when actual funds in the account (i.e., the equity in a Funded Account represented by the amount of capital) differs from the nominal account size (i.e., the size of the Funded Account that establishes the initial account value and level of trading). Notional funds are the difference between nominal account size and actual capital in a Funded Account.Use of notional funding does not change the trading level or that the account may trade in any manner differently than if notional funds were not used. In particular, the same conditions and rules applicable to a soft breach, hard breach, Daily Loss Limit, Max Trailing Drawdown and position limits apply.",
                  },
                  {
                    question:
                      "Do I need to complete KYC or sign a trader contract to start trading in an Instant Funding Plan?",
                    answer:
                      "A Trading contract and KYC are both required, however, to start trading using our Instant Funding Plan, these steps won’t need to be completed until you request a withdrawal. ",
                  },
                  {
                    question: "What happens if I do not pass KYC?",
                    answer:
                      "If you do not pass the KYC process when requesting a withdrawal, the withdrawal will be rejected, and your account will be closed. We encourage you to ensure you can meet KYC requirements before opting for the Instant Funding Plan. ",
                  },
                  {
                    question: "Who is the counterparty to my trades?",
                    answer:
                      "For the purposes of managing risk and minimizing transaction costs, we may offset or negate market risk and act as the direct counterparty to certain trades initiated in the Account. Such trades are executed at prices provided by the Broker. This framework is intended to ensure you receive real market execution on your trades, while simultaneously allowing us to manage risk dynamically by routing existing positions or future orders to third parties for execution as we deem appropriate. We believe that such real market execution and dynamic risk management would not be possible or cost-effective if trades were executed in simulated accounts. Regardless of whether we act as counterparty to your trades, the gain or loss on your Funded Account is not calculated differently. However, when we act as the counterparty to your trades, there is an inherent potential conflict of interest because your trades do not result in net gain or loss to us, as your trades would if we were not the direct counterparty. ",
                  },
                  {
                    question: "Am I subject to any position limits?",
                    answer:
                      "The maximum position that you may open is determined by your available margin. We reserve the right to increase the margin requirement, limit the number of open positions you may enter or maintain in the Funded Account at any time, and to revise in response to market conditions the drawdown levels at which trading in the funded account will be halted. We or the Liquidity Provider reserve the right to refuse to accept any order. ",
                  },
                ],
              },
              {
                category: "General Questions",
                faq: [
                  {
                    question: "What Countries are accepted?",
                    answer:
                      "Instant Funding plans are prohibited for US domiciled customers.  Subject to compliance with applicable laws and regulations, traders from all other countries, excluding OFAC listed countries, can take part in our program, unless otherwise limited at the Company’s discretion.",
                  },
                  {
                    question:
                      "What is the minimum age I must be to be part of your program?",
                    answer:
                      "You must be at least 18 years of age, or the applicable minimum legal age in your country, to purchase an Instant Funding account.",
                  },
                  {
                    question: "Where do I track the progress of my account?",
                    answer:
                      "Upon purchasing an Instant Funding Plan, you will receive access to a trader dashboard where you can monitor your Instant Funded Account. The dashboard is updated in near real time as we calculate your account metrics. It is your responsibility to monitor your breach levels.",
                  },
                  {
                    question: "What Platform can I trade on?",
                    answer:
                      "Our technology is independently integrated with DXtrade, MatchTrader, and cTrader platforms via GooeyTrade.",
                  },
                  {
                    question:
                      "How many Instant Funded Accounts may I have active at one time?",
                    answer:
                      "A maximum of $100,000 in active Instant Funding plans per person is permitted.",
                  },
                  {
                    question: "What products can I trade?",
                    answer:
                      "You can trade any products offered by the Broker, as such products may change from time to time. This includes FX pairs and CFD Indices, Metals, and Cryptocurrencies.",
                  },
                  {
                    question: "Am I subject to any position limits?",
                    answer:
                      "The maximum position that you may open is determined by your available margin. We reserve the right to increase the margin requirement, limit the number of open positions you may enter or maintain in the Funded Account at any time, and to revise in response to market conditions the drawdown levels at which trading in the Funded Account will be halted. We or the Broker reserve the right to refuse to accept any order.",
                  },
                  {
                    question:
                      "How do I withdraw the gains in my Funded Account?",
                    answer:
                      "Traders can request a withdrawal of the gains in their Funded account at any time in their trader dashboard, but no more frequently than once per thirty (30) days. So, if you make gains in your Funded account, you can request a withdrawal. When you are ready to withdraw the gains from your Funded account, click the Withdraw Profits button in your trader dashboard and enter the amount to withdraw. All such gains are distributed via the available outbound payment solutions offered from time to time. Once your withdrawal request is approved, we will pay the monies owed to you. We reserve the right to change the withdrawal methods and options at any time.",
                  },
                  {
                    question:
                      "When can I withdraw the gains in my Funded Account and does that affect my Maximum Drawdown?",
                    answer:
                      "Your first withdrawal can be requested at any time. Thereafter, you can request a withdrawal of the gains in your account every 30 days. When a withdrawal is approved, we will also withdraw our share of the gains, and your max drawdown will remain unaffected. The drawdown does not reset when you request a withdrawal.",
                  },
                  {
                    question: "Who is the counterparty to my trades?",
                    answer:
                      "For purposes of managing risk and minimizing transaction costs, we may offset or negate market risk and act as the direct counterparty to certain trades initiated in the Account. Such trades are executed at prices provided by arm’s length third parties. This framework is intended to ensure you receive real market execution on your trades, while simultaneously allowing us to manage risk dynamically by routing existing positions or future orders to third parties for execution as we deem appropriate. We believe that such real market execution and dynamic risk management would not be possible or as cost-effective if trades were executed in simulated accounts. Regardless of whether we act as counterparty to your trades, the gain or loss on your funded account is not calculated differently. However, when we act as the counterparty to your trades, there is an inherent potential conflict of interest because your trades do not result in net gain or loss to us, as your trades would if we were not the direct counterparty.",
                  },
                  {
                    question:
                      "Do we manipulate the pricing or executions you receive in your Funded Account?",
                    answer:
                      "No. We do not have any control over pricing from the liquidity provider or on the executions on your trades.",
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

export default InstantFaq;
