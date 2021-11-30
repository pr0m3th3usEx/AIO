import { ServiceType } from '.prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: ServiceType;
  @ApiProperty()
  oauth2: boolean;
  @ApiProperty()
  isActivated: boolean;
}

export class UpsertServiceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType, { message: 'Unkwown service' })
  serviceType: ServiceType;

  @ApiProperty()
  @IsBoolean()
  activated: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  accessToken?: string;

  @ApiPropertyOptional()
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
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  serviceType: ServiceType;
}

export type AuthorizationTokens = {
  access_token: string | null;
  refresh_token: string | null;
};
