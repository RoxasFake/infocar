import { Module } from '@nestjs/common';
import { CriarCarroUseCase } from './use-cases/carros/criar-carro.use-case';
import { InfraestruturaModule } from 'src/infraestrutura/infraestrutura.module';
import { ListarCarrosUseCase } from './use-cases/carros/listar-carros.use-case';

@Module({
  imports: [InfraestruturaModule],
  providers: [
    CriarCarroUseCase, 
    ListarCarrosUseCase,
  ],
  exports: [
    CriarCarroUseCase,
    ListarCarrosUseCase,
  ],
})
export class AplicacaoModule {}
