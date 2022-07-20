export type Modalidade = "PRESENCIAL" | "SEMIPRESENCIAL" | "ONLINE";

export type Status_Turma = "PLANEJADO" | "ABERTO" | "CONCLUIDO" | "CANCELADO";

export type Status_Curso = "ATIVO" | "INATIVO";

export type Resultado = "APROVADO" | "REPROVADO" | "DESISTENTE";

export type Turno = "M" | "T" | "N";

export type Role = "Aluno" | "Diretor" | "Tutor";

export interface Usuario {
  id?: string;
  nome?: string;
  cpf?: string;
  email?: string;
  phones?: Telefone[];
  Aluno?: Aluno;
  Tutor?: Tutor;
  Diretor?: Diretor;
  Endereco?: Endereco;
}

export interface Aluno {
  usuarioId?: string;
  usuario?: Usuario;
  matricula?: string;
  Historico?: Historico[];
}

export interface Tutor {
  usuarioId?: string;
  usuario?: Usuario;
  especialidadeId?: string;
  especialidade?: Especialidade;
  cracha?: string;
  Ensina?: Ensina[];
}

export interface Diretor {
  usuarioId?: string;
  usuario?: Usuario;
  cracha?: string;
}

export interface Telefone {
  usuarioId?: string;
  usuario?: Usuario;
  ddi?: number;
  ddd?: number;
  numero?: number;
}

export interface Endereco {
  usuarioId?: string;
  usuario?: Usuario;
  logradouro?: string;
  numero?: number;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface Especialidade {
  id?: string;
  nome?: string;
  descricao?: string;
  instituicao?: string;
  tipo?: string;
  Tutor?: Tutor[];
  Curso?: Curso[];
}

export interface Curso {
  id?: string;
  nome?: string;
  descricao?: string;
  carga_horaria?: number;
  modalidade?: Modalidade;
  status?: Status_Curso;
  Turma?: Turma[];
  especialidadeId?: string;
  especialidade?: Especialidade;
}

export interface Turma {
  id?: string;
  cursoId?: string;
  curso?: Curso;
  data_inicio?: string;
  data_fim?: string;
  status?: Status_Turma;
  Historico?: Historico[];
  Ensina?: Ensina[];
}

export interface Historico {
  turmaId?: string;
  turma?: Turma;
  alunoId?: string;
  aluno?: Aluno;
  frequencia?: number;
  nota?: number;
  resultado?: Resultado;
}

export interface Ensina {
  turmaId: string;
  turma: Turma;
  tutorId: string;
  tutor: Tutor;
  horario?: string;
  turno?: Turno;
}

export interface Session {
  user: Usuario;
}
