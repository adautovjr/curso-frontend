import React from "react";
import { useQuery } from "@apollo/client";
import { getUsers } from "../../graphql/queries";
import { Usuario } from "../../types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddIcon from "@mui/icons-material/Add";

import { StyledFab } from "./styles";
import { useNavigate } from "react-router-dom";

const ListEspecialidades = () => {
  const { loading, error, data } = useQuery<{ usuarios: Usuario[] }>(getUsers);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      <Header />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
            Especialidades
          </Typography>
          <Grid container spacing={4}>
            {data?.usuarios?.map((user: Usuario) => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.nome}
                    </Typography>
                    <Typography>{user.email}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <StyledFab
            color="primary"
            aria-label="add"
            onClick={() => {
              navigate("/users/create", { replace: true });
            }}
          >
            <AddIcon />
          </StyledFab>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default ListEspecialidades;
