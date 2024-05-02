"use client"

import React, { ReactNode } from "react";
import { AccountData } from "./userReducer";

export type UserContextType = {
  account: AccountData;
  setAccount: React.Dispatch<React.SetStateAction<AccountData>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

// تعریف createContext برای دسترسی به state و dispatch در سراسر برنامه
export const UserContext = React.createContext<UserContextType | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: ProductProviderProps) => {
  const [account, setAccount] = React.useState<AccountData>({
    previous: null,
    page: 1,
    next: null,
    results: [],
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        account,
        setAccount,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
