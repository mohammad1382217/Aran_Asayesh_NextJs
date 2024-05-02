"use client"

import React, { ReactNode } from "react";

export type CategoryContextType = {
  categoryData: category[];
  setCategoryData: React.Dispatch<React.SetStateAction<category[]>>;
};

// تعریف createContext برای دسترسی به state و dispatch در سراسر برنامه
export const CategoryContext = React.createContext<CategoryContextType | null>(null);

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categoryData, setCategoryData] = React.useState<category[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        categoryData,
        setCategoryData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

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