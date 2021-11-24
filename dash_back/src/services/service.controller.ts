import { Service, ServiceType } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { CleanedUser } from 'src/user/user.dto';
import { UserDec } from 'src/utils/user.decorator';
import { WidgetConfiguration } from 'src/widget/widget.dto';
import { ServiceProvider } from './service.service';
import {
  AuthorizationDtoUrl,
  AuthorizationTokens,
  ServiceAvailable,
  ServiceURLResponse,
  UpsertServiceDto,
} from './services.dto';

@Controller('/api/services')
export class ServiceController {
  constructor(private serviceProvider: ServiceProvider) {}

  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getServicesAvailable(
    @UserDec() user: CleanedUser,
  ): Promise<ServiceAvailable[]> {
    return this.serviceProvider.getServicesAvailable(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async upsertService(
    @UserDec() user: CleanedUser,
    @Body() body: UpsertServiceDto,
  ): Promise<Service> {
    return this.serviceProvider.upsertService(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:type/widgets')
  async getWidgetFromService(
    @Param('type') type: string,
  ): Promise<WidgetConfiguration[]> {
    return this.serviceProvider.getWidgetFromService(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/service_url')
  async getServiceUrl(
    @Query('serviceType') service: ServiceType,
  ): Promise<ServiceURLResponse> {
    return this.serviceProvider.getServiceUrl(service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/tokens')
  async getTokens(
    @Body() dto: AuthorizationDtoUrl,
  ): Promise<AuthorizationTokens> {
    return this.serviceProvider.getTokens(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getServiceInfo(@Param('id') id: string): Promise<Service> {
    return this.serviceProvider.getServiceInfo(id);
  }
}
