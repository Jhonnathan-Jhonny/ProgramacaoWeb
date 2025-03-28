import { Carro } from './Carro';
import { Pneu } from './Pneu';
import { Motor } from './Motor';
import { Produto } from './Produto';
import { Livro } from './Livro';
import { Biblioteca } from './Biblioteca';

class Main {
    static main(): void {
        // Questão 1
        const produto = new Produto("Arroz",3,3)
        console.log(`\nProdutor: ${produto.nome} Estoque:${produto.quantEstoque}`)
        produto.venderProduto()
        produto.reporEstoque(5)
        console.log("\n")

        //Questão 2
        // Criando objetos de Pneu e Motor
        const pneu1 = new Pneu(2023, "Michelin");
        const motor1 = new Motor(2023, "Ford", "Gasolina");

        const pneu2 = new Pneu(2022, "Pirelli");
        const motor2 = new Motor(2022, "Honda", "Álcool");

        // Criando objetos de Carro
        const carro1 = new Carro("Fusca", 1975, pneu1, motor1);
        const carro2 = new Carro("Civic", 2022, pneu2, motor2);

        // Demonstrando funcionamento
        console.log(`Modelo: ${carro1.modelo}`);
        carro1.motor.ligar();
        carro1.acelerar();
        carro1.frear();

        console.log(`Modelo: ${carro2.modelo}`);
        carro2.motor.ligar();
        carro2.acelerar();
        carro2.frear();

        //Questão 3
        const biblioteca = new Biblioteca("Biblioteca Central");

        // Criando livros
        const livro1 = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", 1178);
        const livro2 = new Livro("1984", "George Orwell", 328);
        const livro3 = new Livro("Dom Casmurro", "Machado de Assis", 256);

        // Adicionando livros à biblioteca
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarLivro(livro3);

        // Listando os livros disponíveis
        biblioteca.listarLivros();
    }
}

Main.main();