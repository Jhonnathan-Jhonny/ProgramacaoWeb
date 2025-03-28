export class Aluno{
    private nome: string;
    private idade: number;
    private nota: number;

    constructor(nome: string, idade: number, nota: number) {
        this.nome = nome;
        this.idade = idade;
        this.nota = nota;
    }

    aprovadoOuReprovado() {
        if(this.nota >= 7) {
            console.log(`${this.nome} está aprovado com nota ${this.nota}`);    
        } else {
            console.log(`${this.nome} está reprovado com nota ${this.nota}`);
        }
    }
}