import { useContext } from "react";
import { MagicContext } from "../context/MagicContext";

export const useMagic = () => {
  return useContext(MagicContext)
}