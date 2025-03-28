export class Filme {
    private titulo: string;
    private anoLancamento: number;
    private genero: string;

    constructor(titulo: string, anoLancamento: number, genero: string) {
        this.titulo = titulo;
        this.anoLancamento = anoLancamento;
        this.genero = genero;
    }

    getTitulo(): string {
        return this.titulo;
    }

    getAnoLancamento(): number {
        return this.anoLancamento;
    }

    getGenero(): string {
        return this.genero;
    }
    
}