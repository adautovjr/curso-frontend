import { MagicUserMetadata } from "magic-sdk";
import { createContext } from "react";
import { useProvideAuth as useProviderAuth } from "../hooks/useAuth";
import { Usuario } from "../types";

export interface AuthContextType {
  user: Usuario | null;
  signin: (userData: MagicUserMetadata, cb?: () => void) => void;
  signout: (cb?: () => void) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
