import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between bg-primary fixed z-50 w-full gap-5 p-6 shadow-sm dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/rustacean.png"
          alt="rustacean"
          width={20}
          height={20}
        />
        <p className="h2-bold font-spaceGrotesk text-black dark:text-white max-sm:hidden">
          mlaskowski<span className="text-tertiary">7</span>
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
