import {Motor} from './Motor';
import {Pneu} from './Pneu';

export class Carro {
    modelo: string;
    ano: number;
    velocidade: number;
    pneu: Pneu;
    motor: Motor;
  
    constructor(modelo: string, ano: number, pneu: Pneu, motor: Motor) {
      this.modelo = modelo;
      this.ano = ano;
      this.velocidade = 0;
      this.motor = motor;
      this.pneu = pneu;
    }
  
    acelerar(): void {
      this.velocidade += 10;
      console.log(`Acelerando... Velocidade atual: ${this.velocidade} km/h`);
    }
  
    frear(): void {
      if (this.velocidade > 0) {
        this.velocidade -= 10;
        console.log(`Freando... Velocidade atual: ${this.velocidade} km/h`);
      } else {
        console.log("O carro já está parado.");
      }
    }
  }
  