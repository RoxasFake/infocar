/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CarrosEntity } from 'src/dominio/entities/carros.entity';
import { BuscarCarroUseCase } from './buscar-carro.use-case';
import { CarroRepository } from 'src/infraestrutura/repositories/carro.repository';
import { NotFoundException } from '@nestjs/common';

describe('BuscarCarroUseCase', () => {
    let buscarCarroUseCase: BuscarCarroUseCase;
    let carroRepository: CarroRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                BuscarCarroUseCase,
                {
                    provide: CarroRepository,
                    useValue: {},
                },
            ],
        }).compile();
    
        buscarCarroUseCase = moduleRef.get(BuscarCarroUseCase);
        carroRepository = moduleRef.get(CarroRepository);

        carroRepository.buscarCarro = jest.fn();
    });
    
    describe('execute', () => {
        describe('quando a busca encontrar o carro', () => {
            it('buscou o carro por Id', async () => {
                carroRepository.buscarCarro = jest.fn().mockResolvedValue(new CarrosEntity());
                await buscarCarroUseCase.execute({
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                })

                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });
        });

        describe('quando a busca não encontrar', () => {
            it('buscou o carro por Id', async () => {
                await buscarCarroUseCase.execute({
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                })

                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });

            it('exceção de conflito será lançada', async () => {
                await expect(buscarCarroUseCase.execute({
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                })).rejects.toThrow(new NotFoundException ('Carro com o ID informado não existe.'));
            });
        });
    });
});