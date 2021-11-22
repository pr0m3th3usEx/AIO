import { Service } from '.prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { CleanedUser } from 'src/user/user.dto';
import { UserDec } from 'src/utils/user.decorator';
import { ServiceProvider } from './service.service';
import { ServiceAvailable, UpsertServiceDto } from './services.dto';

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
}
