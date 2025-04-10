import { Livro } from "./Livro";

export class Biblioteca {
    private livros: Livro[] = [];
    private capacidadeMaxima: number;

    constructor(public nome: string, capacidade: number = 10) {
        this.capacidadeMaxima = capacidade;
    }

    adicionarLivro(livro: Livro): void {
        if (this.livros.length < this.capacidadeMaxima) {
            this.livros.push(livro);
            console.log(`Livro "${livro.titulo}" adicionado à biblioteca "${this.nome}".`);
        } else {
            console.log("A biblioteca atingiu sua capacidade máxima de livros.");
        }
    }

    listarLivros(): void {
        if (this.livros.length === 0) {
            console.log("A biblioteca não possui livros disponíveis.");
            return;
        }

        console.log(`Livros disponíveis na biblioteca "${this.nome}":`);
        this.livros.forEach((livro, index) => {
            console.log(`${index + 1}. "${livro.titulo}" - ${livro.autor} (${livro.numeroPaginas} páginas)`);
        });
    }
}
