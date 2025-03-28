import { Filme } from './Filme';

export class Cliente {
    private filmesAlugados: Filme[] = [];
    private limiteFilmes: number = 3;

    constructor(
        public nome: string,
        public cpf: string
    ) {}

    alugarFilme(filme: Filme): void {
        if (this.filmesAlugados.length < this.limiteFilmes) {
            this.filmesAlugados.push(filme);
            console.log(`${this.nome} alugou o filme "${filme.getTitulo()}".`);
        } else {
            console.log(`${this.nome} já atingiu o limite de ${this.limiteFilmes} filmes alugados.`);
        }
    }

    listarFilmesAlugados(): void {
        if (this.filmesAlugados.length === 0) {
            console.log(`${this.nome} não tem filmes alugados.`);
            return;
        }

        console.log(`Filmes alugados por ${this.nome}:`);
        this.filmesAlugados.forEach((filme, index) => {
            console.log(`${index + 1}. "${filme.getTitulo()}" - ${filme.getGenero()} (${filme.getAnoLancamento()})`);
        });
    }
}