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
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
//import { CreateCarDto } from './dto/create-car.dto';

@Controller('carros')
export class CarrosController {
  //constructor(private readonly carrosService: CarrosService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() criarCarroDto: CriarCarroDtoRequest): CriarCarroDtoResponse {

    console.log(criarCarroDto.placa);
    return  {
      id: '1' 
    };
    //return this.carrosService.create(createCarDto);
  }

  @Get()
  @ApiInternalServerErrorResponse()
  @HttpCode(200)
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
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @HttpCode(200)
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
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @HttpCode(204)
  update(@Param() carroIdDtoRequest: CarroIdDtoRequest, @Body() updateCarroDtoRequest :UpdateCarroDtoRequest ) {
    console.log(carroIdDtoRequest, updateCarroDtoRequest);
    return;
    //return this.carrosService.update(id, updateCarDto);
  }

  //@HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @HttpCode(204)
  remove(@Param() carroIdDtoRequest: CarroIdDtoRequest) {
    console.log(carroIdDtoRequest);
    return;
    //return this.carrosService.remove(id);
  }
}