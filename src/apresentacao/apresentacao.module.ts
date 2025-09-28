import { Module } from '@nestjs/common';
import { CarrosController } from './controllers/carros.controller';
import { AplicacaoModule } from 'src/aplicacao/aplicacao.module';

@Module({
  imports: [AplicacaoModule],
  controllers: [CarrosController],
  providers: [],
  exports: [],
})
export class ApresentacaoModule {}
