/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CarrosEntity } from 'src/dominio/entities/carros.entity';
import { CriarCarroUseCase } from './criar-carro.use-case';
import { CarroRepository } from 'src/infraestrutura/repositories/carro.repository';
import { ConflictException } from '@nestjs/common';

describe('CriarCarroUseCase', () => {
    let criarCarroUseCase: CriarCarroUseCase;
    let carroRepository: CarroRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CriarCarroUseCase,
                {
                    provide: CarroRepository,
                    useValue: {},
                },
            ],
        }).compile();
    
        criarCarroUseCase = moduleRef.get(CriarCarroUseCase);
        carroRepository = moduleRef.get(CarroRepository);

        carroRepository.buscarCarroPorPlacaChassiRenavam = jest.fn();
        carroRepository.persistirCarro = jest.fn();
    });
    
    describe('execute', () => {
        describe('quando o carro ainda não estiver cadastrado', () => {
            it('buscou o carro por parâmetros específicos', async () => {
                await criarCarroUseCase.execute({
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                })

                expect(carroRepository.buscarCarroPorPlacaChassiRenavam).toHaveBeenCalledWith('ABC1234', '12345678901234567', '12345678901');
            });

            it('persistirá o novo carro com sucesso', async () => {
                carroRepository.buscarCarroPorPlacaChassiRenavam = jest.fn().mockResolvedValue(null);
                const novoCarro = new CarrosEntity();
                Object.assign(novoCarro, {
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
                carroRepository.persistirCarro = jest.fn().mockResolvedValue(novoCarro);

                const retornoNovoCarro = await criarCarroUseCase.execute({
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                });
                const carroPersistir = new CarrosEntity();
                Object.assign(carroPersistir, {
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                });
                expect(carroRepository.persistirCarro).toHaveBeenCalledWith(carroPersistir)
                expect(retornoNovoCarro).toEqual(novoCarro);
            });
        });

        describe('quando o carro estiver cadastrado', () => {
            it('buscou o carro por parâmetros específicos', async () => {
                await criarCarroUseCase.execute({
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                })

                expect(carroRepository.buscarCarroPorPlacaChassiRenavam).toHaveBeenCalledWith('ABC1234', '12345678901234567', '12345678901');
            });

            it('exceção de conflito será lançada', async () => {
                carroRepository.buscarCarroPorPlacaChassiRenavam = jest.fn().mockResolvedValue(new CarrosEntity());

                await expect(criarCarroUseCase.execute({
                    placa: 'ABC1234',
                    chassi: '12345678901234567',
                    renavam: '12345678901',
                    modelo: 'Modelo X',
                    marca: 'Marca Y',
                    ano: 2020,
                })).rejects.toThrow(new ConflictException('Carro com a mesma placa, chassi ou renavam já existe.'));
            });

            it('Metodo de Persistencia não chamado', async () => {
                carroRepository.buscarCarroPorPlacaChassiRenavam = jest.fn().mockResolvedValue(new CarrosEntity());

                try {
                    await criarCarroUseCase.execute({
                        placa: 'ABC1234',
                        chassi: '12345678901234567',
                        renavam: '12345678901',
                        modelo: 'Modelo X',
                        marca: 'Marca Y',
                        ano: 2020,
                    })
                } catch (error) { /* empty */ }                

                expect(carroRepository.persistirCarro).not.toHaveBeenCalled();
            });
        });
    });
});