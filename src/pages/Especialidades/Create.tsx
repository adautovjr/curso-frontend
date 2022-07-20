import React, { useRef } from "react";
import { useQuery } from "@apollo/client";
import { getUsers } from "../../graphql/queries";
import { Usuario } from "../../types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CheckIcon from "@mui/icons-material/Check";

import { StyledFab } from "./styles";
import { Form } from "@unform/web";
import { Input } from "../../components/Form/Input";
import Select from "../../components/Form/Select";

const CreateEspecialidade = () => {
  const { loading, error, data } = useQuery<{ usuarios: Usuario[] }>(getUsers);

  const formRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
            Nova Especialidade
          </Typography>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Input label="Nome" name="nome" type="text" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input label="Email" name="email" type="email" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input label="CPF" name="cpf" type="text" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Select
                  label="Role"
                  name="Role"
                  options={[
                    { value: "Aluno", label: "Aluno", default: true },
                    { value: "Tutor", label: "Tutor" },
                    { value: "Diretor", label: "Diretor" },
                  ]}
                />
              </Grid>
            </Grid>
            <StyledFab color="primary" aria-label="add" type="submit">
              <CheckIcon />
            </StyledFab>
          </Form>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEspecialidade;
