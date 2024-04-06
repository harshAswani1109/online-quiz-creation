"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#00000050] p-4 flex items-center justify-between flex-wrap fixed w-full">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="text-white text-md font-bold">YourLogo</span>
      </div>

      {/* Hamburger Menu */}
      <div className="block md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white hover:text-gray-400 focus:outline-none"
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full flex-grow md:flex md:items-center md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row justify-center md:flex-grow">
          <li>
            <div className="block text-white px-4 py-2 rounded cursor-pointer hover:underline">
              <Link href="/home">
                <span>Home</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="block text-white px-4 py-2 rounded cursor-pointer hover:underline">
              <Link href="/running-out-products">
                <span>Running Out Products</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="block text-white px-4 py-2 rounded cursor-pointer hover:underline">
              <Link href="/all-products">
                <span>All Products</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      {/* User Name */}
      <div className="md:flex items-center hidden">
        <span className="text-white font-semibold">Username</span>
      </div>
    </nav>
  );
};

export default Navbar;
