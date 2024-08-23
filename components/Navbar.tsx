import { NavLink, navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 p-6 shadow-sm dark:shadow-none sm:px-12">
      <div className="flex gap-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="rustacean" width={40} height={40} />
          <p className="font-bold font-roboto max-sm:hidden">
            M
            <span className="text-tertiary dark:text-dark-tertiary">
              LASKOWSKI7
            </span>
          </p>
        </Link>
        <div className="flex items-center gap-2 text-tertiary dark:text-dark-tertiary font-spaceGrotesk">
          {navLinks.map(
            (item: NavLink, index: number): JSX.Element => (
              <Link
                key={index}
                className="text-center hover:text-secondary dark:hover:text-white ease-in-out duration-300"
                href={`/${item.link}`}
              >
                {item.title}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
