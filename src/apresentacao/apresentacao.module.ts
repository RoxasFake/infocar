import { Module } from '@nestjs/common';
import { CarrosController } from './controllers/carros.controller';

@Module({
  imports: [],
  controllers: [CarrosController],
  providers: [],
  exports: [],
})
export class ApresentacaoModule {}
