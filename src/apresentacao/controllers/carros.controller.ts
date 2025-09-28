import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CarroIdDtoRequest, CarrosDtoResponse, CriarCarroDtoRequest, CriarCarroDtoResponse, UpdateCarroDtoRequest } from '../dtos/carros.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CriarCarroUseCase } from 'src/aplicacao/use-cases/carros/criar-carro.use-case';
import { plainToInstance } from 'class-transformer';
import { ListarCarrosUseCase } from 'src/aplicacao/use-cases/carros/listar-carros.use-case';
import { BuscarCarroUseCase } from 'src/aplicacao/use-cases/carros/buscar-carro.use-case';
import { CarrosEntity } from 'src/dominio/entities/carros.entity';

@Controller('carros')
export class CarrosController {
  constructor(
    private readonly criarCarroUseCase: CriarCarroUseCase,
    private readonly listarCarrosUseCase: ListarCarrosUseCase,
    private readonly buscarCarroUseCase: BuscarCarroUseCase,
  ) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiConflictResponse({ description: 'Carro com a mesma placa, chassi ou renavam já existe.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async criarCarro(@Body() criarCarroDto: CriarCarroDtoRequest): Promise<CriarCarroDtoResponse> {
    const { id } = await this.criarCarroUseCase.execute(criarCarroDto);
    return { id };
  }

  @Get()
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.OK)
  async listarCarros() :Promise<CarrosDtoResponse[]> {
    const carros = await this.listarCarrosUseCase.execute();

    return plainToInstance(CarrosDtoResponse, carros)
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Carro não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do carro inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.OK)
  async buscarCarro(@Param() carroIdDtoRequest: CarroIdDtoRequest) : Promise<CarrosEntity> {
    return await this.buscarCarroUseCase.execute({id: carroIdDtoRequest.id});
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Carro não encontrado.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param() carroIdDtoRequest: CarroIdDtoRequest, @Body() updateCarroDtoRequest :UpdateCarroDtoRequest ) {
    console.log(carroIdDtoRequest, updateCarroDtoRequest);
    return;
    //return this.carrosService.update(id, updateCarDto);
  }

  //@HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Carro não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do carro inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deletaCarro(@Param() carroIdDtoRequest: CarroIdDtoRequest) {
    console.log(carroIdDtoRequest);
    return;
  }
}