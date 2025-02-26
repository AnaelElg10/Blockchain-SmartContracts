"use client";

import Image from "next/image";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";

const HeroSection = () => {
  const account = useActiveAccount();
  return (
    <div className="md:items-center flex flex-col justify-center h-[80Vh]">
      <div
        className="font-medium 2xl:w-1/3 md:w-2/3 xl:w-1/2 lg:px-0 px-8 text-5xl xl:text-6xl flex justify-center xl:font-medium xl:pt-14 text-center pt-6 "
      >
        Your Digital Identity, Reinvented{" "}
      </div>

      <p
        className=" text-2xl pt-4 text-center w-2/3 mx-auto"
      >
        Create Once, Identify Everywhere with{" "}
        <span className="text-sky-500 font-bold">IdentiFi</span>
      </p>

      <div className="flex gap-4 pt-6 items-center justify-center">
        <Link href="/">
          
        </Link>
      </div>

      <div className="pt-10 xl:pt-20 items-center justify-center">
        <Image
          src="/assets/ReadingSideDoodle.svg"
          alt="hero image"
          width={1000}
          height={1000}
          className="flex items-center justify-center mx-auto w-60 xl:w-80"
        />
      </div>
      <div className="flex w-full justify-center">
        {account && (<Link
            href="/onboard"
            className="bg-gray-700 text-slate-50 mt-auto px-2 py-2 rounded-md shadow-md transition-all duration-500 hover:bg-sky-600/90 hover:shadow-lg flex items-center justify-center font-medium text-sm "
          >
            Create a Digital ID →
          </Link>)
          }
      </div>
    </div>
  );
};

export default HeroSection;