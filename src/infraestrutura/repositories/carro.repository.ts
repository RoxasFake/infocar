import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarrosEntity } from "src/dominio/entities/carros.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarroRepository {
    
    constructor(
        @InjectRepository(CarrosEntity)
        private carrosRepository: Repository<CarrosEntity>,
    ) {}

    async persistirCarro(carro: CarrosEntity): Promise<CarrosEntity> {
        return await this.carrosRepository.save(carro);
    }

    async buscarCarroPorPlacaChassiRenavam( placa?:string, chassi?:string, renavam?:string): Promise<CarrosEntity | null> {
        return await this.carrosRepository.findOne({where: [ {placa}, {chassi}, {renavam} ]});
    }

    async listarCarros(): Promise<CarrosEntity[]> {
        return await this.carrosRepository.find({order: {createdAt: 'DESC'}});
    }

}