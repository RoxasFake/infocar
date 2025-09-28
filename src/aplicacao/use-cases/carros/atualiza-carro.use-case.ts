import { Injectable, NotFoundException } from "@nestjs/common";
import { CarrosEntity } from "src/dominio/entities/carros.entity";
import { CarroRepository } from "src/infraestrutura/repositories/carro.repository";

@Injectable()
export  class AtualizaCarroUseCase {
    constructor(
        private readonly carroRepository: CarroRepository,
    ) {}
    
    async execute(carro:Partial<CarrosEntity>): Promise<void> {
        const carroExistente = await this.carroRepository.buscarCarro(carro.id || '');
        if(!carroExistente) {
            throw new NotFoundException('Carro com o ID informado não existe.');
        }
        await this.carroRepository.atualizaCarro(carro);
    }
}