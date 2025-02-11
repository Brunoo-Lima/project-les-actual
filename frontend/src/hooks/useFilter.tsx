'use client';

import { ISelect } from '@/@types/ISelect';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface IFilterContextProps {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStatus: ISelect | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<ISelect | null>>;
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  selectedProfilePurchase: ISelect | null;
  setSelectedProfilePurchase: React.Dispatch<
    React.SetStateAction<ISelect | null>
  >;
  selectedCategory: ISelect | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ISelect | null>>;
  selectedPrice: number;
  setSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
  handleChangeCategory: (value: string) => void;
  handleChangeStatus: (value: string) => void;
}

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext<IFilterContextProps>(
  {} as IFilterContextProps
);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ISelect | null>(null);
  const [searchName, setSearchName] = useState<string>('');
  const [selectedProfilePurchase, setSelectedProfilePurchase] =
    useState<ISelect | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ISelect | null>(
    null
  );
  const [selectedPrice, setSelectedPrice] = useState<number>(10);

  const handleChangeCategory = (value: string) => {
    setSelectedCategory({
      value,
      label: value,
    });
  };

  const handleChangeStatus = (value: string) => {
    setSelectedStatus({
      value,
      label: value,
    });
  };

  const contextValue = useMemo(
    () => ({
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      searchName,
      setSearchName,
      selectedProfilePurchase,
      setSelectedProfilePurchase,
      selectedCategory,
      setSelectedCategory,
      handleChangeCategory,
      handleChangeStatus,
      selectedPrice,
      setSelectedPrice,
    }),
    [
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      searchName,
      setSearchName,
      selectedProfilePurchase,
      setSelectedProfilePurchase,
      selectedCategory,
      setSelectedCategory,
      selectedPrice,
      setSelectedPrice,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
