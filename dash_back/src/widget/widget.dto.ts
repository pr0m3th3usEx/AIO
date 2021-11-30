import { Widget, WidgetType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class WidgetParameterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  value: string | number;
}

export class CreateWidgetDto {
  @ApiProperty({ enum: WidgetType })
  @IsEnum(WidgetType, { message: 'Invalid type of widget' })
  type: WidgetType;

  @ApiProperty()
  @IsUUID()
  service_id: string;

  @ApiProperty()
  @IsInt({ message: 'Refresh rate must be positive' })
  @IsPositive({ message: 'Refresh rate must be positive' })
  refresh_rate: number;

  @ApiProperty({ type: [WidgetParameterDto] })
  @IsArray({ message: 'Parameters must be an array' })
  parameters: WidgetParameterDto[];
}

export class UpdateWidgetParameterDto {
  @ApiProperty()
  @IsInt({ message: 'Refresh rate must be positive' })
  @IsPositive({ message: 'Refresh rate must be positive' })
  refresh_rate: number;

  @ApiProperty({ type: [WidgetParameterDto] })
  @IsArray({ message: 'Parameters must be an array' })
  parameters: WidgetParameterDto[];
}

export class WidgetParameterConfiguration {
  name: string;
  type: 'string' | 'integer';
}

export class WidgetConfiguration {
  name: string;
  type: WidgetType;
  description: string;
  params: WidgetParameterConfiguration[];
}
