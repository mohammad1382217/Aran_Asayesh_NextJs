"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonHeader from "./buttonHeader";
import { baseUrl } from "@/app/config/apiconfig";
import { category, CategoryContext } from "@/app/hooks/categoryProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../input";

const Header = () => {
  const category = React.useContext(CategoryContext)!;
  const { categoryData, setCategoryData } = category;

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getCategory = async () => {
      const resCat = await fetch(`${baseUrl}category/`, {
        signal: signal,
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

      if (!resCat.ok) {
        // This will activate the closest error.js Error Boundary
        throw new Error("Failed to fetch data");
      }
      setCategoryData(await resCat.json());
      return resCat.json();
    };

    getCategory();
    return () => {
      abortController.abort();
    };
  }, []);

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
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="./gift.svg"
                  alt="AranAsayesh"
                  width={25}
                  height={25}
                  priority
                />
              </div>
            </Link>
            <ButtonHeader />
          </div>
        </div>
      </section>
      <section className="w-full hidden xl:flex xl:items-center xl:justify-center py-6 lg:py-4 bg-[#ECECEC]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center justify-center gap-5">
              {categoryData.map((category) => (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger>
                    {category.show_name}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                  {category.sub_categories.map((item) => (
                    <DropdownMenuItem>{item.name}</DropdownMenuItem>
                  ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
            <div className="w-64">
              <Input className="w-[22rem] xl:block text-pretty rounded-[10px] py-2.5 px-3 z-20 focus:outline-none text-sm mx-1 text-gray-900 bg-gray-50 border-2 !border-[#8754AF] focus:border-2 focus:shadow-none focus:border-red-600 pl-10"></Input>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;
