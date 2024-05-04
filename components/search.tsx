"use client";

import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeSearch = useDebouncedCallback(async (term: string) => {
    setSearchValue(term);
  }, 300);

  const handleSearch = async () => {
    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    let updatedPathname = pathname;
    if (!pathname.includes("company")) {
      updatedPathname = "company" + pathname; // Add "company" at the beginning if not already present
    }

    replace(`${updatedPathname}?${params.toString()}`);
  };

  return (
    <div className="w-auto">
      <div className="relative flex items-center">
        <Input
          name="search"
          placeholder={placeholder}
          className="w-[22rem] xl:block text-pretty rounded-[10px] py-2.5 px-3 z-20 focus:outline-none text-sm text-gray-900 bg-gray-50 border-2 !border-[#8754AF] focus:border-2 focus:shadow-none pl-10"
          onChange={(e) => {
            handleChangeSearch(e.target.value);
          }}
        />

        <Button
          onClick={handleSearch}
          className="absolute z-50 left-3 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert flex self-center"
            src="./search.svg"
            alt="AranAsayesh"
            width={27}
            height={26}
            priority
          />
        </Button>
      </div>
    </div>
  );
};

export default Search;
