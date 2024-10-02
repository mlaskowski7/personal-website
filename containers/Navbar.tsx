"use client";

import { NavLink, navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "../components/ThemeSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between max-md:justify-center max-md:items-center fixed top-0 z-50 bg-primary dark:bg-dark-primary w-full gap-5 p-6 shadow-sm dark:shadow-none sm:px-12 max-md:flex-col max-sm:w-[100vw]">
      {/* Left side with logo and nav links */}
      <div className="flex gap-10">
        <Link href="/" className="flex items-center gap-3 max-md:hidden">
          <Image src="/logo.png" alt="rustacean" width={40} height={40} />
          <p className="font-bold font-roboto ">MLASKOWSKI7</p>
        </Link>
        {/* Regular navbar for larger screens */}
        <div className="hidden md:flex items-center w-full ml-10 gap-2 text-tertiary dark:text-dark-tertiary font-spaceGrotesk">
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

      {/* Right side with theme switch and mobile menu button */}
      <div className="flex items-center max-sm:justify-between max-sm:w-full">
        <ThemeSwitch />
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-2xl text-tertiary dark:text-dark-tertiary"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary dark:bg-dark-primary flex flex-col items-center gap-4 py-5 text-tertiary dark:text-dark-tertiary font-spaceGrotesk z-50">
          {navLinks.map((item: NavLink, index: number): JSX.Element => {
            return (
              <ScrollLink
                key={index}
                className="text-center hover:text-black dark:hover:text-white ease-in-out duration-300 cursor-pointer"
                to={item.link}
                activeClass="text-black dark:text-white"
                smooth={true}
                spy={true}
                onClick={toggleMobileMenu} // Close menu when link is clicked
              >
                {item.title}
              </ScrollLink>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
