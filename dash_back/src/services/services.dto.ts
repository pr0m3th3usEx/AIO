import { ServiceType } from '.prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { WidgetConfiguration } from 'src/widget/widget.dto';

export class ServiceAvailable {
  id: string;
  name: ServiceType;
  oauth2: boolean;
  isActivated: boolean;
}

export class UpsertServiceDto {
  @IsString()
  @IsOptional()
  id?: string;
  @IsEnum(ServiceType, { message: 'Unkwown service' })
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
  @IsString()
  authorization_url: string;
  @IsArray()
  widgets: WidgetConfiguration[];
}

export type ServiceURLResponse = {
  authorize_url: string;
};

export class AuthorizationDtoUrl {
  @IsString()
  url: string;
  @IsEnum(ServiceType)
  serviceType: ServiceType;
}

export type AuthorizationTokens = {
  access_token: string | null;
  refresh_token: string | null;
};
