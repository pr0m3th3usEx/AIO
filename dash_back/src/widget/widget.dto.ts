import { Widget, WidgetType } from '.prisma/client';
import { IsArray, IsEnum, IsPositive, IsString, IsUUID } from 'class-validator';

export class WidgetParameterDto {
  @IsString()
  name: string;
  value: string | number;
}

export class CreateWidgetDto {
  @IsEnum(WidgetType, { message: 'Invalid type of widget' })
  type: WidgetType;
  @IsUUID()
  user_id: string;
  @IsUUID()
  service_id: string;
  @IsPositive()
  refresh_rate: number;
  @IsArray({ message: 'parameters must be an array' })
  parameters: WidgetParameterDto[];
}
