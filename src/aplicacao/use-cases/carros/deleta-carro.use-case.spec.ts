/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CarroRepository } from 'src/infraestrutura/repositories/carro.repository';
import { DeletaCarroUseCase } from './deleta-carro.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeletaCarroUseCase', () => {
    let deletaCarroUseCase: DeletaCarroUseCase;
    let carroRepository: CarroRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                DeletaCarroUseCase,
                {
                    provide: CarroRepository,
                    useValue: {},
                },
            ],
        }).compile();
    
        deletaCarroUseCase = moduleRef.get(DeletaCarroUseCase);
        carroRepository = moduleRef.get(CarroRepository);

        carroRepository.listarCarros = jest.fn();
    });
    
    describe('listarCarros', () => {
        describe('Quando o delete encontrar o carro', () => {
            it('Encontrou carro por id para deletar', async () => {
                carroRepository.buscarCarro = jest.fn().mockResolvedValue('ac24619c-511d-4575-844a-379decb49cf9');
                await deletaCarroUseCase.execute({id:'ac24619c-511d-4575-844a-379decb49cf9'});
                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });
            it('Realizou a ação de deletar', async () => {
                carroRepository.deletaCarro = jest.fn().mockResolvedValue('ac24619c-511d-4575-844a-379decb49cf9');
                await deletaCarroUseCase.execute({id:'ac24619c-511d-4575-844a-379decb49cf9'});
                expect(carroRepository.deletaCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });
        });
        describe('Quando o delete não encontrar o carro', () => {
            it('buscou o carro por Id', async () => {
                await carroRepository.buscarCarro('ac24619c-511d-4575-844a-379decb49cf9')

                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });

            it('exceção de conflito será lançada', async () => {
                await expect(carroRepository.buscarCarro('ac24619c-511d-4575-844a-379decb49cf9')
                ).rejects.toThrow(new NotFoundException ('Carro com o ID informado não existe.'));
            });
        });
    });
});