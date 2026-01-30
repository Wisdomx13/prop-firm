"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { nav } from "../../../data";

const NavbarReact = () => {
  const pathname = usePathname();

  const [navData, setNavData] = useState(nav);

  useEffect(() => {
    if (pathname) {
      setNavData((state) => {
        const newState = [...state];

        newState.map((s) => {
          if (s.items) {
            s.isActive =
              s.items.filter((item) => {
                if (item.link == pathname) {
                  item.isActive = true;
                  return true;
                } else {
                  item.isActive = false;
                  return false;
                }
              }).length > 0
                ? true
                : false;
          } else {
            s.isActive = pathname == s.link;
          }
        });

        return newState;
      });
    }
  }, [pathname]);
  return (
    <div className="hidden lg:block">
      <nav className="flex items-center justify-center gap-1">
        {navData.map((menu, i) => {
          if (menu.items) {
            return (
              <div key={i}>
                <HoverCard openDelay={100}>
                  <HoverCardTrigger
                    className={`text-sm  hover:text-[#FFD700] hover:transition-colors font-normal cursor-pointer mr-5 flex gap-1 items-center ${
                      menu.isActive ? "text-[#FFD700]" : "text-foreground"
                    } `}
                  >
                    {menu.label} <IoMdArrowDropdown className="w-4 h-4" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-max !border-none z-[102] bg-transparent">
                    <ul className="flex flex-col gap-2">
                      {menu.items.map((submenu, j) => (
                        <li key={j}>
                          <Link
                            href={submenu.link}
                            className={`px-3 py-1 rounded-sm   text-[13px] ${
                              submenu.isActive
                                ? "text-[#FFD700] hover:bg-transparent hover:text-[#FFD700]"
                                : "text-foreground hover:bg-[#FFD700] hover:transition-colors hover:text-black"
                            }`}
                          >
                            {submenu.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </div>
            );
          }
          return (
            <Link
              href={menu.link}
              key={i}
              className={`text-sm  hover:text-[#FFD700] hover:transition-colors font-normal mr-5 tracking-tight ${
                menu.isActive ? "text-[#FFD700]" : "text-foreground"
              } `}
            >
              {menu.label}
            </Link>
          );
        })}
        {/* <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" flex items-center gap-5 justify-center">
              {navData.map((menu, i) =>
                menu.items ? (
                  <NavDropdown
                    className="flex !flex-col"
                    title={menu.label}
                    id="basic-nav-dropdown"
                    key={i}
                  >
                    {menu.items.map((submenu, j) => (
                      <NavDropdown.Item
                        key={j}
                        href={submenu.link}
                        className="block hover:bg-[#AD800A] hover:transition-colors px-2 py-1 rounded-sm"
                      >
                        {submenu.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={menu.link} key={i}>
                    {menu.label}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container> */}
      </nav>
    </div>
  );
};

export default NavbarReact;
