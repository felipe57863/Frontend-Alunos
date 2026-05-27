import { GrupoForm } from './grupo-form';

export interface RegistroForm {
  descricaoAtividade: string;
  quantidadeTotalAlunosSala: number;
  grupoForm: GrupoForm[];
}
