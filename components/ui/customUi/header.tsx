import Link from "next/link";
import Image from "next/image";
import ButtonHeader from "./buttonHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
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
              <DropdownMenu>
                <DropdownMenuTrigger>آیتم</DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>1</DropdownMenuItem>
                  <DropdownMenuItem>1</DropdownMenuItem>
                  <DropdownMenuItem>1</DropdownMenuItem>
                  <DropdownMenuItem>1</DropdownMenuItem>
                  <DropdownMenuItem>1</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-auto"></div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;
