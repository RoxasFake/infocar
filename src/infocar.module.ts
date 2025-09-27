import { Module } from '@nestjs/common';
import { AplicacaoModule } from './aplicacao/aplicacao.module';
import { ApresentacaoModule } from './apresentacao/apresentacao.module';
import { DominioModule } from './dominio/dominio.module';
import { InfraestruturaModule } from './infraestrutura/infraestrutura.module';

@Module({
  imports: [
    AplicacaoModule,
    ApresentacaoModule,
    DominioModule,
    InfraestruturaModule,
  ],
})
export class InfocarModule {}
