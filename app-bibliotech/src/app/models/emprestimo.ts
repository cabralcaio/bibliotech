import { Livro } from "./livro";

export interface Emprestimo {
    id?: string;
    dataEmprestimo?: Date;
    email: string;
    status: string;
    fotoUrl?: string;
    livro: Livro;
    telefone: string;
    leitor: string;
}
