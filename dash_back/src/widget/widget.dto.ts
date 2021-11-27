import { Widget, WidgetType } from '.prisma/client';
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
  @IsString()
  name: string;
  value: string | number;
}

export class CreateWidgetDto {
  @IsEnum(WidgetType, { message: 'Invalid type of widget' })
  type: WidgetType;
  @IsUUID()
  service_id: string;
  @IsInt({ message: 'Refresh rate must be positive' })
  @IsPositive({ message: 'Refresh rate must be positive' })
  refresh_rate: number;
  @IsArray({ message: 'Parameters must be an array' })
  parameters: WidgetParameterDto[];
}

export class UpdateWidgetParameterDto {
  @IsInt({ message: 'Refresh rate must be positive' })
  @IsPositive({ message: 'Refresh rate must be positive' })
  refresh_rate: number;
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
