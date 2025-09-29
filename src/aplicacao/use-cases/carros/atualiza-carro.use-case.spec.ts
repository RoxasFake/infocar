/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CarrosEntity } from 'src/dominio/entities/carros.entity';
import { AtualizaCarroUseCase } from './atualiza-carro.use-case';
import { CarroRepository } from 'src/infraestrutura/repositories/carro.repository';
import { NotFoundException } from '@nestjs/common';

describe('AtualizaCarroUseCase', () => {
    let atualizaCarroUseCase: AtualizaCarroUseCase;
    let carroRepository: CarroRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AtualizaCarroUseCase,
                {
                    provide: CarroRepository,
                    useValue: {},
                },
            ],
        }).compile();
    
        atualizaCarroUseCase = moduleRef.get(AtualizaCarroUseCase);
        carroRepository = moduleRef.get(CarroRepository);

        carroRepository.buscarCarro = jest.fn();
        carroRepository.persistirCarro = jest.fn();
    });
    
    describe('execute', () => {
        describe('quando o carro ainda não estiver atualizado', () => {
            it('buscou o carro por ID', async () => {
                await atualizaCarroUseCase.atualizaCarro(
                    {
                        id: 'ac24619c-511d-4575-844a-379decb49cf9',
                        placa: 'ABC1234',
                        chassi: '12345678901234567',
                        renavam: '12345678901',
                        modelo: 'Modelo X',
                        marca: 'Marca Y',
                        ano: 2020,
                    }
                )

                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });

            it('Atualizara o carro com sucesso', async () => {
                carroRepository.buscarCarro = jest.fn().mockResolvedValue(null);
                const carroAtualizado = new CarrosEntity();
                Object.assign(carroAtualizado, {
                    id: 'ac24619c-511d-4575-844a-379decb49cf9',
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                carroRepository.persistirCarro = jest.fn().mockResolvedValue(carroAtualizado);

                const retornoCarro = await atualizaCarroUseCase.atualizaCarro({
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                });
                const carroUpdate = new CarrosEntity();
                Object.assign(carroUpdate, {
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                });
                expect(carroRepository.atualizaCarro).toHaveBeenCalledWith(carroUpdate)
                expect(retornoCarro).toEqual(carroAtualizado);
            });
        });

        describe('quando o carro não estiver cadastrado', () => {
            it('buscou o carro por ID', async () => {
                await atualizaCarroUseCase.atualizaCarro({
                    id:'ac24619c-511d-4575-844a-379decb49cf9',
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                })

                expect(carroRepository.buscarCarro).toHaveBeenCalledWith('ac24619c-511d-4575-844a-379decb49cf9');
            });

            it('exceção de notfound será lançada', async () => {
                carroRepository.buscarCarro = jest.fn().mockResolvedValue(new CarrosEntity());

                await expect(atualizaCarroUseCase.atualizaCarro({
                    id:'1',
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                })).rejects.toThrow(new NotFoundException('Carro com o ID informado não existe.'));
            });

            it('Metodo de atualizar não chamado', async () => {
                carroRepository.buscarCarro = jest.fn().mockResolvedValue(new CarrosEntity());

                try {
                    await atualizaCarroUseCase.atualizaCarro({
                        id:'ac24619c-511d-4575-844a-379decb49cf9',
                        placa: 'ABC1234',
                        chassi: '12345678901234567',
                        renavam: '12345678901',
                        modelo: 'Modelo X',
                        marca: 'Marca Y',
                        ano: 2020,
                    })
                } catch (error) { /* empty */ }                

                expect(carroRepository.atualizaCarro).not.toHaveBeenCalled();
            });
        });
    });
});