// "use client";

import React from "react";
import Link from "next/link";
import Search from "./search";
import Image from "next/image";
import ButtonHeader from "./buttonHeader";
import { IoIosArrowDown } from "react-icons/io";
import { baseUrl } from "@/app/config/apiconfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const abortController = new AbortController();
const signal = abortController.signal;

const getCategory = async () => {
  const resCat = await fetch(`${baseUrl}category/`, {
    signal: signal,
    cache: "default",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!resCat.ok) {
    // This will activate the closest error.js Error Boundary
    throw new Error("Failed to fetch data");
  }

  return resCat.json();
};

const Header = async () => {
  const categoryData: category[] = await getCategory();

  return (
    <nav className="bg-slate-50 w-full sm:border-b-1">
      <section className="container mx-auto px-6 py-4 lg:px-16">
        <div className="w-full flex xl:items-center sm:justify-between justify-evenly gap-2">
          <div className="flex items-center justify-center gap-2 xl:gap-4">
            <Link href={"/"} className="flex items-center gap-4">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert xl:w-[79px] xl:h-[102px] flex self-center"
                src="./logo-orginal.svg"
                alt="AranAsayesh"
                width={43}
                height={56}
                priority
              />
              <h1 className="text-2xl xl:text-3xl font-semibold text-primary">
                آران آسایش آفرینان
              </h1>
            </Link>
          </div>
          <div className="hidden xl:flex xl:items-center xl:justify-center gap-4">
            <Link className="cursor-pointer" href={"/BuySubscription"}>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-semibold text-primary">
                  خرید کارت تخفیف
                </span>
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert flex self-center w-auto h-auto"
                  src="./gift.svg"
                  alt="gift"
                  width={"25"}
                  height={"25"}
                  priority
                />
              </div>
            </Link>
            <ButtonHeader />
          </div>
        </div>
      </section>
      <section className="w-full hidden xl:flex xl:items-center xl:justify-center py-6 lg:py-4 bg-[#ECECEC]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center gap-5">
              {categoryData.map((category) => (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger className="flex items-center justify-center gap-2 text-[#717171] border-none outline-none cursor-pointer">
                    {category.show_name}
                    <IoIosArrowDown />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    <div
                      style={{
                        backgroundImage: `url(${category.image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="bg-cover overflow-auto w-80 h-72 rounded-e-lg"
                    >
                      {category.sub_categories.map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          className="w-48 cursor-pointer"
                        >
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
            <Search placeholder="جستجو (مرکز خدماتی، رستوران، استخر و ...)" />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;

// types
export interface category {
  id: number;
  icon: string;
  name: string;
  show_name: string;
  image: string;
  sub_categories: subCategory[];
}

interface subCategory {
  id: number;
  name: string;
}