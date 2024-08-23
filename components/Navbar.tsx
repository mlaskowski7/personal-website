"use client";

import { NavLink, navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { usePathname } from "next/navigation";
import router from "next/router";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

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
            const isActive = pathname === `/${item.link}`;
            return (
              <Link
                key={index}
                className={`text-center hover:text-black dark:hover:text-white ease-in-out duration-300 ${
                  isActive && "text-black dark:text-white"
                }`}
                href={`/${item.link}`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      <ThemeSwitch />
    </nav>
  );
};

export default Navbar;
