import { Exclude, Expose } from 'class-transformer';
import { IsString, IsInt, Min, Max, Length, IsUUID } from 'class-validator';

export class CriarCarroDtoRequest {
  @IsString()
  @Length(7, 7)
  placa: string;

  @IsString()
  @Length(17, 17)
  chassi: string;

  @IsString()
  @Length(9, 11)
  renavam: string;

  @IsString()
  @Length(1, 100)
  modelo: string;

  @IsString()
  @Length(1, 100)
  marca: string;

  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  ano: number;
}

export class CriarCarroDtoResponse {
  id: string;
}

@Exclude()
export class CarrosDtoResponse {
  @Expose()
  id: string;

  @Expose()
  placa: string;

  @Expose()
  modelo: string;
}

@Exclude()
export class CarroDtoResponse {
  @Expose()
  id: string;
  
  @Expose()
  placa: string;

  @Expose()
  modelo: string;

  @Expose()
  marca: string;

  @Expose()
  ano: number;

  @Expose()
  chassi: string;

  @Expose()
  renavam: string;

  @Expose()
  createdAt: Date;
}

export class UpdateCarroDtoRequest {

  @IsString()
  @Length(7, 7)
  placa?: string;

  @IsString()
  @Length(17, 17)
  chassi?: string;

  @IsString()
  @Length(9, 11)
  renavam?: string;

  @IsString()
  @Length(1, 100)
  modelo?: string;

  @IsString()
  @Length(1, 100)
  marca?: string;

  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  ano?: number;
}

export class UpdateCarroDtoResponse {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  chassi: string;
  renavam: string;
}

export class CarroIdDtoRequest {
  @IsUUID('4')
  id: string;
}