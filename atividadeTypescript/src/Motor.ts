export class Motor {
    anoFabricacao: number;
    marca: string;
    tipoCombustivel: string;
  
    constructor(anoFabricacao: number, marca: string, tipoCombustivel: string) {
      this.anoFabricacao = anoFabricacao;
      this.marca = marca;
      this.tipoCombustivel = tipoCombustivel;
    }
  
    ligar() {
      console.log("Motor ligado!");
    }
  }
  