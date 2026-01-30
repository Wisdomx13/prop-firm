import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Faq {
  question: string;
  answer: string;
}
export interface FaqProps {
  category: string;
  faq: Faq[];
}
interface FaqTabProps {
  faqCateogies: FaqProps[];
}

const FaqTab = ({ faqCateogies }: FaqTabProps) => {
  const findFaqCategories = faqCateogies.map((f) => f.category);

  const findFaq = (category: string) => {
    return faqCateogies.find((c) => c.category == category)!.faq;
  };

  return (
    <section className="container pt-[70px] lg:pt-16">
      <div
        className="bg-[#F5F5F5] 
       rounded-4xl p-3 lg:p-5"
      >
        <Tabs
          defaultValue={findFaqCategories[0].toLowerCase()}
          className="w-full"
        >
          <TabsList className="flex w-full gap-2 items-center !bg-transparent">
            {findFaqCategories.map((category, i) => (
              <TabsTrigger
                className="flex-1 text-gray-900 border-none bg-white"
                value={category.toLowerCase()}
                key={i}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {findFaqCategories.map((category, i) => (
            <TabsContent
              className="mt-3"
              value={category.toLowerCase()}
              key={i}
            >
              <FaqList faq={findFaq(category)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FaqTab;

const FaqList = ({ faq }: { faq: Faq[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {faq.map((f, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger className=" text-gray-800 py-3 text-base lg:text-lg font-semibold px-4 w-full border">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="w-full text-xs lg:text-sm mt-2 ml-2 block b font-normal text-gray-500">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
