import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav } from "../../../data";

const NavbarSm = () => {
  const pathname = usePathname();

  const [navData, setNavData] = useState(nav);

  useEffect(() => {
    if (pathname) {
      setNavData((state) => {
        const newState = [...state];

        newState.map((s) => {
          if (s.items) {
            s.isActive = !!s.items.find((item) => {
              if (item.link == pathname) {
                item.isActive = true;
                return true;
              }
            });
          } else {
            s.isActive = pathname == s.link;
          }
        });

        return newState;
      });
    }
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <FaBars className="w-6 h-6 text-foreground" />
        </SheetTrigger>
        <SheetContent className="w-full bg-background !border-none z-[100]">
          <SheetHeader></SheetHeader>
          <div className="pl-16">
            {navData.map((nav, i) => {
              if (nav.items) {
                return (
                  <Accordion type="single" collapsible key={i}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={`text-sm !m-0 max-w-[350px] hover:text-[#FFD700] hover:transition-colors font-normal cursor-pointer  flex gap-1 items-center ${
                          nav.isActive ? "text-[#FFD700]" : "text-foreground"
                        } `}
                      >
                        {nav.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc">
                          {nav.items.map((submenu, i) => (
                            <li key={i}>
                              <Link
                                href={submenu.link}
                                className={`px-3 py-1 rounded-sm   text-[13px] ${
                                  submenu.isActive
                                    ? "text-[#FFD700] text-xs hover:bg-transparent "
                                    : "text-foreground hover:text-[#FFD700]"
                                }`}
                              >
                                {submenu.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
                  <Link
                    key={i}
                    href={nav.link}
                    className={`text-sm mb-5 block hover:text-[#FFD700] hover:transition-colors font-medium mr-5 tracking-tight ${
                      nav.isActive ? "text-[#FFD700]" : "text-foreground"
                    } `}
                  >
                    {nav.label}
                  </Link>
                );
              }
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarSm;
