import { gql } from "@apollo/client/core";

export const getUsers = gql`
  query usuarios {
    usuarios {
      id
      nome
      email
      phones {
        numero
      }
    }
  }
`;

export const getTurmas = gql`
  query turmas {
    turmas {
      id
      curso {
        nome
      }
      data_inicio
      data_fim
      status
      Ensina {
        tutor {
          usuario {
            nome
          }
        }
      }
    }
  }
`

export const getUserByEmail = gql`
  query usuario($filter: UsuarioWhereInput!) {
    findFirstUsuario(where: $filter) {
      id
      nome
      email
      cpf
      phones {
        numero
      }
      Aluno {
        usuarioId
      }
      Tutor {
        cracha
      }
      Diretor {
        cracha
      }
      Endereco {
        usuarioId
        logradouro
        numero
        complemento
        bairro
        cidade
        uf
      }
    }
  }
`;
