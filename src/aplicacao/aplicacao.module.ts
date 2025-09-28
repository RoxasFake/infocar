import { Module } from '@nestjs/common';
import { CriarCarroUseCase } from './use-cases/carros/criar-carro.use-case';
import { InfraestruturaModule } from 'src/infraestrutura/infraestrutura.module';
import { ListarCarrosUseCase } from './use-cases/carros/listar-carros.use-case';
import { BuscarCarroUseCase } from './use-cases/carros/buscar-carro.use-case';
import { DeletaCarroUseCase } from './use-cases/carros/deleta-carro.use-case';
import { AtualizaCarroUseCase } from './use-cases/carros/atualiza-carro.use-case';

@Module({
  imports: [InfraestruturaModule],
  providers: [
    CriarCarroUseCase, 
    ListarCarrosUseCase,
    BuscarCarroUseCase,
    DeletaCarroUseCase,
    AtualizaCarroUseCase,
  ],
  exports: [
    CriarCarroUseCase,
    ListarCarrosUseCase,
    BuscarCarroUseCase,
    DeletaCarroUseCase,
    AtualizaCarroUseCase,
  ],
})
export class AplicacaoModule {}
