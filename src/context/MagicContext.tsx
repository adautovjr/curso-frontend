import { Magic } from "magic-sdk";
import React, { createContext } from "react";

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY || "");

type MagicContextType = {
  magic: Magic;
};

export const MagicContext = createContext<MagicContextType>({
  magic,
} as MagicContextType);

interface MagicProviderProps {
  children: React.ReactNode;
}

export const MagicProvider: React.FC<MagicProviderProps> = ({ children }) => {
  return (
    <MagicContext.Provider value={{ magic }}>{children}</MagicContext.Provider>
  );
};
