import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

//   Value means the value we are working on right now
  @Transform(({value})=> parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2025)
  year: number;

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({value}) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({value}) => parseFloat(value))
  @IsLatitude()
  lat: number;

}
