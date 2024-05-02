"use client";

import React from "react";
import { HiDownload } from "react-icons/hi";
import { baseUrl } from "../config/apiconfig";
import { Button } from "@/components/ui/button";
import { UserContext } from "../hooks/userProvider";
import { useRouter } from "next/navigation";

const ButtonHeader = () => {
  const router = useRouter();
  const User = React.useContext(UserContext)!;
  const { account, setAccount, isLoggedIn, setIsLoggedIn } = User;
  const [isShowModalLogin, setIsShowModalLogin] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const getAccount = async () => {
        const resAcc = await fetch(`${baseUrl}account/`);
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.

        if (!resAcc.ok) {
          // This will activate the closest error.js Error Boundary
          throw new Error("Failed to fetch data");
        }
        setIsLoggedIn(true);
        setAccount(await resAcc.json());
        return resAcc.json();
      };

      getAccount();
    } else {
      setIsLoggedIn(false);
    }

    const getCategory = async () => {
      const resCat = await fetch(`${baseUrl}category/`);
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

      if (!resCat.ok) {
        // This will activate the closest error.js Error Boundary
        throw new Error("Failed to fetch data");
      }
      // setAccount(await resCat.json());
      return resCat.json();
    };

    getCategory();

  }, [isLoggedIn]);

  const showModalLogin = () => setIsShowModalLogin(!isShowModalLogin);

  return (
    <>
      {isLoggedIn ? null : (
        <Button
          className="py-2.5 px-6 rounded-lg border-[3px] border-solid border-primary text-lg font-semibold text-primary hover:!bg-white bg-white"
          onClick={showModalLogin}
        >
          ورود
        </Button>
      )}
      {isLoggedIn ? (
        account!?.results[0]?.permission?.is_owner ? (
          <>
            <Button
              onClick={() => router.push("/profileOne")}
              className="py-2.5 px-6 rounded-lg border-[3px] border-solid border-primary text-lg font-semibold text-primary hover:!bg-white bg-white"
            >
              پروفایل کاربری
            </Button>
            <Button
              onClick={() => router.push("/CCP/")}
              className="py-2.5 px-6 rounded-lg border-[3px] border-solid border-primary text-lg font-semibold text-primary hover:!bg-white bg-white"
            >
              پنل مدیریت
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push("/profileOne")}
            className="py-2.5 px-6 rounded-lg border-[3px] border-solid border-primary text-lg font-semibold text-primary hover:!bg-white bg-white"
          >
            پروفایل کاربری
          </Button>
        )
      ) : null}

      <Button
        onClick={() => router.push("/Application")}
        className="py-2.5 px-6 flex items-center justify-center rounded-lg border-[3px] border-solid border-primary text-lg font-semibold bg-primary hover:!bg-primary text-white gap-2"
      >
        دانلود اپلیکیشن
        <HiDownload className="w-6 h-6" />
      </Button>
    </>
  );
};

export default ButtonHeader;
