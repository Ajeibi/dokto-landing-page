"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface StoreContextProps {
  isloading: boolean;
  setIsloading: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;

}

const StoreContext = createContext<StoreContextProps>({
  isloading: false,
  setIsloading: (): boolean => false,
  loggedIn: false,
});

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [isloading, setIsloading] = useState(false);
  const [loggedIn, _setOnce] = useState(false);

  return <StoreContext.Provider value={{ isloading, setIsloading, loggedIn }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreProvider;
