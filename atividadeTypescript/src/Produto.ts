export class Produto{
    nome: string;
    preco: number;
    quantEstoque: number;

    constructor(nome:string, preco:number, quantEstoque: number){
        this.nome = nome;
        this.preco = preco;
        this.quantEstoque = quantEstoque;
    }

    venderProduto(): void {
    if(this.quantEstoque > 0){
        this.quantEstoque--;
        console.log(`Venda realizada! Quantidade estoque = ${this.quantEstoque}`)
    } else {
        console.log("Produto indisponível!")
    }
    }

    reporEstoque(quantEstoque: number){
        if(this.quantEstoque > 0){
            this.quantEstoque += quantEstoque 
            console.log(`Produto adicionado! Quantidade estoque = ${this.quantEstoque}`)
        } else {
            console.log("A quantidade para reposição deve ser maior que zero!")
        }
    }
}