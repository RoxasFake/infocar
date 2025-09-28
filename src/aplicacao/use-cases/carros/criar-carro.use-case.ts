import { ConflictException, Injectable } from "@nestjs/common";
import { CarrosEntity } from "src/dominio/entities/carros.entity";
import { CarroRepository } from "src/infraestrutura/repositories/carro.repository";

@Injectable()
export  class CriarCarroUseCase {
    constructor(
        private readonly carroRepository: CarroRepository,
    ) {}
    
    async execute(carro:Partial<CarrosEntity>): Promise<CarrosEntity> {
        const carroExistente = await this.carroRepository.buscarCarroPorPlacaChassiRenavam(carro.placa, carro.chassi, carro.renavam);
        if(carroExistente) {
            throw new ConflictException('Carro com a mesma placa, chassi ou renavam já existe.');
        }

        const novoCarro = new CarrosEntity();
        Object.assign(novoCarro, carro);
        return await this.carroRepository.persistirCarro(novoCarro);
    }
}