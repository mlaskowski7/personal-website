import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 p-6 shadow-sm dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/rust.png" alt="rustacean" width={20} height={20} />
        <p className="font-bold font-roboto max-sm:hidden">
          M
          <span className="text-tertiary dark:text-dark-tertiary">
            LASKOWSKI7
          </span>
        </p>
      </Link>

      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
