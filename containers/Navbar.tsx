"use client";

import { NavLink, navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "../components/ThemeSwitch";

const Navbar = () => {
  return (
    <nav className="flex justify-between max-md:justify-center max-md:items-center fixed z-50 w-full gap-5 p-6 shadow-sm dark:shadow-none sm:px-12 max-md:flex-col">
      <div className="flex gap-10">
        <Link href="/" className="flex items-center gap-3 max-md:hidden">
          <Image src="/logo.png" alt="rustacean" width={40} height={40} />
          <p className="font-bold font-roboto ">
            M
            <span className="text-tertiary dark:text-dark-tertiary">
              LASKOWSKI7
            </span>
          </p>
        </Link>
        <div className="flex items-center w-full ml-10 gap-2 text-tertiary dark:text-dark-tertiary font-spaceGrotesk max-md:flex-col">
          {navLinks.map((item: NavLink, index: number): JSX.Element => {
            return (
              <ScrollLink
                key={index}
                className="text-center hover:text-black dark:hover:text-white ease-in-out duration-300 cursor-pointer"
                to={item.link}
                activeClass="text-black dark:text-white"
                smooth={true}
                spy={true}
              >
                {item.title}
              </ScrollLink>
            );
          })}
        </div>
      </div>
      <ThemeSwitch />
    </nav>
  );
};

export default Navbar;
