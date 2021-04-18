import { Setor } from "./../setor/setor.model";
export interface Colaborador {
  setor: Setor;
  id?: number;
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  idade?: number;
}
