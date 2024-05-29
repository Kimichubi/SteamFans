import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  MoonIcon,
  PaperAirplaneIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

import { useState } from "react";

export default function HeaderAuth() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <nav>
        <div className="min-w-full  bg-black rounded">
          <div className="flex justify-around w-auto">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16 my-12">
              {/* logo */}
              <div>
                <Link
                  href="/"
                  className="flex gap-1 font-bold text-white items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3em"
                    height="3em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8.21 17.32L7 16.8a2.13 2.13 0 1 0 1.17-2.93l1.28.53a1.58 1.58 0 0 1-1.22 2.92z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 0 0-10 9.34l5.38 2.21a2.31 2.31 0 0 1 .47-.24A2.62 2.62 0 0 1 9 13.1l2.44-3.56a3.8 3.8 0 1 1 3.8 3.8h-.08l-3.51 2.5a2.77 2.77 0 0 1-5.47.68l-3.77-1.6A10 10 0 1 0 12 2"
                    />
                    <path
                      fill="currentColor"
                      d="M17.79 9.5a2.53 2.53 0 1 0-2.53 2.5a2.54 2.54 0 0 0 2.53-2.5m-4.42 0a1.9 1.9 0 1 1 1.9 1.91a1.9 1.9 0 0 1-1.9-1.92z"
                    />
                  </svg>
                  <Typography className="text-white">Steam Fans</Typography>
                </Link>
              </div>
              {/* primary */}
              <div className="lg:flex gap-8 text-white">
                <Link href="/home" className="text-white">
                  Home
                </Link>
                <Link className="text-white" href="/help">
                  Contact Us
                </Link>
              </div>
            </div>
            {/* secondary */}
            <div className=" flex gap-6">
              <div className={`hidden xs:flex items-center gap-10`}>
                <div className="lg:flex items-center gap-2">
                  <MoonIcon className="h-6 w-6" />
                  <SunIcon className="h-6 w-6" />
                </div>
                <div>
                  <Button
                    onClick={() => {}}
                    className={`text-white rounded-full border-solid border-2  bg-gray-700 border-gray-300 py-2 px-4 hover:bg-white hover:text-black`}
                  >
                    Oi
                  </Button>
                </div>
              </div>
              {/* Mobile navigation toggle */}
              <div className="flex items-center">
                <Button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col  gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8 bg-white">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <Link
                href={"/profile"}
                className="text-inherit no-underline text-white rounded-full border-solid border-2  bg-gray-700 border-gray-300 py-2 px-4 hover:bg-slate-600 hover:text-black items-center flex justify-center"
              >
                <Button className="text-white rounded-full border-solid border-2  bg-gray-700 border-gray-300 py-2 px-4 hover:bg-white hover:text-black w-full text-lg">
                  Profile
                  <svg
                    className="text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="4em"
                    height="4em"
                    viewBox="0 0 48 48"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                    >
                      <circle cx="24" cy="12" r="8" fill="#2f88ff" />
                      <path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" />
                    </g>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
