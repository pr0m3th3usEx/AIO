import { ServiceType } from '.prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { WidgetConfiguration } from 'src/widget/widget.dto';

export class ServiceAvailable {
  name: ServiceType;
  oauth2: boolean;
  isActivated: boolean;
}

export class UpsertServiceDto {
  @IsString()
  @IsOptional()
  id?: string;
  @IsEnum(ServiceType)
  serviceType: ServiceType;
  @IsBoolean()
  activated: boolean;
  @IsString()
  @IsOptional()
  accessToken?: string;
  @IsString()
  @IsOptional()
  refreshToken?: string;
}

export class ServiceConfiguration {
  @IsEnum(ServiceType)
  name: ServiceType;
  @IsBoolean()
  oauth2: boolean;
  @IsArray()
  widgets: WidgetConfiguration[];
}
