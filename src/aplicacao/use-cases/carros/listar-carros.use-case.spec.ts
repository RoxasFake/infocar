/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { ListarCarrosUseCase } from './listar-carros.use-case';
import { CarroRepository } from 'src/infraestrutura/repositories/carro.repository';

describe('ListarCarrosUseCase', () => {
    let listarCarrosUseCase: ListarCarrosUseCase;
    let carroRepository: CarroRepository;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ListarCarrosUseCase,
                {
                    provide: CarroRepository,
                    useValue: {},
                },
            ],
        }).compile();
    
        listarCarrosUseCase = moduleRef.get(ListarCarrosUseCase);
        carroRepository = moduleRef.get(CarroRepository);

        carroRepository.listarCarros = jest.fn();
    });
    
    describe('listarCarros', () => {
        describe('Quando listar os carros', () => {
            it('Buscou lista de carros', async () => {
                await listarCarrosUseCase.listarCarros();

                expect(carroRepository.listarCarros).toHaveBeenCalledWith();
            });
        });
    });
});