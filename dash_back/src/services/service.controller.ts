import { Service, ServiceType, WidgetType } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

@ApiTags('services')
@Controller('/api/services')
export class ServiceController {
  constructor(private serviceProvider: ServiceProvider) {}

  @ApiResponse({
    status: 200,
    description: 'Get services available and if they are activated ',
    type: [ServiceAvailable],
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getServicesAvailable(
    @UserDec() user: CleanedUser,
  ): Promise<ServiceAvailable[]> {
    return this.serviceProvider.getServicesAvailable(user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get the service updated',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async upsertService(
    @UserDec() user: CleanedUser,
    @Body() body: UpsertServiceDto,
  ): Promise<Service> {
    return this.serviceProvider.upsertService(user.id, body);
  }

  @ApiResponse({
    status: 200,
    description: 'Get widgets existing for a specific service',
  })
  @ApiParam({ name: 'type', enum: WidgetType })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/:type/widgets')
  async getWidgetFromService(
    @Param('type') type: string,
  ): Promise<WidgetConfiguration[]> {
    return this.serviceProvider.getWidgetFromService(type);
  }

  @ApiResponse({
    status: 200,
    description: 'Get Authorization Url for oauth2-required service',
  })
  @ApiQuery({ name: 'serviceType', enum: ServiceType })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/service_url')
  async getServiceUrl(
    @Query('serviceType') service: ServiceType,
  ): Promise<ServiceURLResponse> {
    return this.serviceProvider.getServiceUrl(service);
  }

  @ApiResponse({
    status: 200,
    description: 'Return oauth2 tokens after having completed oauth2 procedure',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Post('/tokens')
  async getTokens(
    @Body() dto: AuthorizationDtoUrl,
  ): Promise<AuthorizationTokens> {
    return this.serviceProvider.getTokens(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get information about a specific service',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getServiceInfo(@Param('id') id: string): Promise<Service> {
    return this.serviceProvider.getServiceInfo(id);
  }
}
