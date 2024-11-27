import { createContext, useState } from "react";

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [currency, setCurrency] = useState("usd");

  return (
    <CoinContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};
