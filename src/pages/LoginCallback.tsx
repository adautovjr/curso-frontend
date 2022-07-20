import React, { useEffect } from "react";
import { useMagic } from "../hooks/useMagic";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginCallback: React.FC = () => {
  const { signin } = useAuth();
  const { magic } = useMagic();
  const navigate = useNavigate();

  const handleCallback = async () => {
    if (window.location.pathname === "/callback") {
      try {
        /* Complete the "authentication callback" */
        await magic.auth.loginWithCredential();

        /* Get user metadata including email */
        const userMetadata = await magic.user.getMetadata();
        signin(userMetadata, () => navigate("/", { replace: true }));
      } catch (err) {
        console.log(
          "🚀 ~ file: LoginCallback.tsx ~ line 21 ~ handleCallback ~ err",
          err
        );
        /* In the event of an error, we'll go back to the login page */
        // window.location.href = window.location.origin;
      }
    }
  };

  useEffect(() => {
    handleCallback();
  }, [magic]);

  return <div>Loading user info...</div>;
};

export default LoginCallback;
