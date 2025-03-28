import { Carro } from './Carro';
import { Pneu } from './Pneu';
import { Motor } from './Motor';
import { Produto } from './Produto';
import { Livro } from './Livro';
import { Biblioteca } from './Biblioteca';
import { Aluno } from './Aluno';
import { Filme } from './Filme';
import { Cliente } from './Cliente';

class Main {
    static main(): void {
        // Questão 1
        const produto = new Produto("Arroz",3,3)
        console.log(`\nProdutor: ${produto.nome} Estoque:${produto.quantEstoque}`)
        produto.venderProduto()
        produto.reporEstoque(5)
        console.log("\n")

        //Questão 2
        const pneu1 = new Pneu(2023, "Michelin");
        const motor1 = new Motor(2023, "Ford", "Gasolina");

        const pneu2 = new Pneu(2022, "Pirelli");
        const motor2 = new Motor(2022, "Honda", "Álcool");

        const carro1 = new Carro("Fusca", 1975, pneu1, motor1);
        const carro2 = new Carro("Civic", 2022, pneu2, motor2);

        console.log(`Modelo: ${carro1.modelo}`);
        carro1.motor.ligar();
        carro1.acelerar();
        carro1.frear();

        console.log(`Modelo: ${carro2.modelo}`);
        carro2.motor.ligar();
        carro2.acelerar();
        carro2.frear();

        console.log("\n")


        //Questão 3
        const biblioteca = new Biblioteca("Biblioteca Central");

        const livro1 = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", 1178);
        const livro2 = new Livro("1984", "George Orwell", 328);
        const livro3 = new Livro("Dom Casmurro", "Machado de Assis", 256);

        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarLivro(livro3);

        biblioteca.listarLivros();

        console.log("\n")

        //Questão 4
        const aluno1 = new Aluno("João", 20, 8);
        const aluno2 = new Aluno("Maria", 22, 6);
        const aluno3 = new Aluno("Pedro", 19, 9);

        aluno1.aprovadoOuReprovado();
        aluno2.aprovadoOuReprovado();
        aluno3.aprovadoOuReprovado();

        console.log("\n")


        //Questão 5
        const filme1 = new Filme("O Poderoso Chefão", 1972, "Drama");
        const filme2 = new Filme("Interestelar", 2014, "Ficção Científica");
        
        const cliente = new Cliente("João Silva", "123.456.789-00");
        
        cliente.alugarFilme(filme1);
        cliente.alugarFilme(filme2);
        
        cliente.listarFilmesAlugados();
    }
}

Main.main();