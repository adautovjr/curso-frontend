import React, { useEffect, useRef } from "react";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";
import Input from "../components/Form/Input";
import { useLazyQuery } from "@apollo/client";
import { getUserByEmail } from "../graphql/queries";
import { Usuario } from "../types";
import { useMagic } from "../hooks/useMagic";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container/Container";
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";

interface LoginData {
  email: string;
}

const Login = () => {
  const [checkEmail, { loading, error, data }] = useLazyQuery<{
    findFirstUsuario: Usuario;
  }>(getUserByEmail);
  const { signin } = useAuth();
  const { magic } = useMagic();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<LoginData> = (formData) => {
    formRef.current?.setErrors({});
    if (formData.email) {
      checkEmail({
        variables: {
          filter: {
            email: {
              equals: formData.email,
            },
          },
        },
      }).then(async (result) => {
        if (result.data?.findFirstUsuario?.email) {
          const redirectURI = `${window.location.origin}/callback`;
          await magic.auth.loginWithMagicLink({
            email: result.data.findFirstUsuario.email,
            redirectURI,
          });
        } else {
          formRef.current?.setFieldError("email", "Email não encontrado");
        }
      });
    }
  };

  const checkIsLoggedIn = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    console.log(
      "🚀 ~ file: LoginCallback.tsx ~ line 22 ~ handleCallback ~ isLoggedIn",
      isLoggedIn
    );

    /* Show login form if user is not logged in */

    if (isLoggedIn) {
      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();
      signin(userMetadata, () => navigate("/", { replace: true }));
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="email" type="email" />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
