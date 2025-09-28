import { Module } from '@nestjs/common';
import { CriarCarroUseCase } from './use-cases/carros/criar-carro.use-case';
import { InfraestruturaModule } from 'src/infraestrutura/infraestrutura.module';

@Module({
  imports: [InfraestruturaModule],
  providers: [CriarCarroUseCase],
  exports: [CriarCarroUseCase],
})
export class AplicacaoModule {}
