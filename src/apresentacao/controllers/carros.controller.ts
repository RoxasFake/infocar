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
import { CarroDtoResponse, CarroIdDtoRequest, CarrosDtoResponse, CriarCarroDtoRequest, CriarCarroDtoResponse, UpdateCarroDtoRequest } from '../dtos/carros.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CriarCarroUseCase } from 'src/aplicacao/use-cases/carros/criar-carro.use-case';

@Controller('carros')
export class CarrosController {
  constructor(private readonly criarCarroUseCase: CriarCarroUseCase) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiConflictResponse({ description: 'Carro com a mesma placa, chassi ou renavam já existe.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() criarCarroDto: CriarCarroDtoRequest): Promise<CriarCarroDtoResponse> {
    const { id } = await this.criarCarroUseCase.execute(criarCarroDto);
    return { id };
  }

  @Get()
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.OK)
  findAll() :CarrosDtoResponse[] {
    return  [{
        id: '1',
        placa: 'ABC1234',
        modelo: 'Gol',
      },  
      {
        id: '2',
        placa: 'DEF5678',
        modelo: 'Civic',
      }
    ];
    //return `This action returns all carros. Query params: ${JSON.stringify(query)}`;
    //return this.carrosService.findAll(query);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Carro não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do carro inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param() carroIdDtoRequest: CarroIdDtoRequest) : CarroDtoResponse {
    console.log(carroIdDtoRequest);
    return  {
      id: '1',
      placa: 'ABC1234',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2020,
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
    };
    //return `This action returns a #${id} carro`;
    //return this.carrosService.findOne(id);
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
  remove(@Param() carroIdDtoRequest: CarroIdDtoRequest) {
    console.log(carroIdDtoRequest);
    return;
    //return this.carrosService.remove(id);
  }
}