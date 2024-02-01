"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSearchStore } from "@/lib/store/state";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
export default function Nav() {
  const pathName = usePathname();
  console.log(pathName);
  const [searchString, setSearchString] = useState("");
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target.value);
    useSearchStore.setState({ searchString: e.target.value });
  }
  return (
    <nav className="flex border-gray-200  mb-10 mx-auto">
      <div className="  flex items-center justify-between w-full ">
        <div className="flex">
          <div className="w-20">
            <Image src={logo} alt="" priority={true}></Image>
          </div>

          <span className="self-center text-lg font-semibold whitespace-nowrap">
            MovieMann
          </span>
        </div>

        <div
          className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1 relative mx-auto"
          id="mobile-menu-3"
        >
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/movies"
                className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
                aria-current="page"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex md:order-2 w-32 justify-end">
          <div className="relative   hidden md:block ">
            <div className="hidden search sm:block">
              <input
                id="search"
                onChange={(e) => {
                  handleSearchChange(e);
                }}
                value={searchString}
                type="text"
                className="w-56 rounded-full border-transparent bg-slate-100 pr-8 shadow-none transition-[width] duration-300 ease-in-out focus:w-72 focus:border-transparent  px-1.5 py-2"
                placeholder="Search..."
              />
              <Search className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 " />
            </div>
            <a className="relative text-white/70 sm:hidden" href="#top">
              <Search className="w-5 h-5 dark:text-slate-500" />
            </a>
          </div>

          <button
            data-collapse-toggle="mobile-menu-3"
            type="button"
            className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-3"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
