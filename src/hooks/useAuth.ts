import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { MagicUserMetadata } from "magic-sdk";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserByEmail } from "../graphql/queries";
import { Usuario } from "../types";
import { useMagic } from "./useMagic";

export const useAuth = () => {
  return useContext(AuthContext);
}

export const useProvideAuth = () => {

  const [checkEmail, { loading, error, data }] = useLazyQuery<{
    findFirstUsuario: Usuario;
  }>(getUserByEmail);
  const [user, setUser] = useState<Usuario | null>(null);
  const { magic } = useMagic()

  const signin = (userData: MagicUserMetadata, cb?: () => void) => {
    checkEmail({
      variables: {
        filter: {
          email: {
            equals: userData.email,
          },
        },
      },
    }).then(async (result) => {
      if (result.data?.findFirstUsuario) {
        setUser(result.data?.findFirstUsuario);
      }
      cb && cb();
    })
  }

  const signout = async (cb?: () => void) => {
    setUser(null);
    await magic.user.logout();
    cb && cb();
  };

  return {
    user,
    signin,
    signout
  };
}