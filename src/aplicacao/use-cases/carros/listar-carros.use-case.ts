import { Injectable } from "@nestjs/common";
import { CarrosEntity } from "src/dominio/entities/carros.entity";
import { CarroRepository } from "src/infraestrutura/repositories/carro.repository";

@Injectable()
export  class ListarCarrosUseCase {
    constructor(
        private readonly carroRepository: CarroRepository,
    ) {}
    
    async listarCarros(): Promise<CarrosEntity[]> {
        return await this.carroRepository.listarCarros();
    }
}