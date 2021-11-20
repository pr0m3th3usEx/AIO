import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { CleanedUser } from 'src/user/user.dto';
import { UserDec } from 'src/utils/user.decorator';
import { ServiceProvider } from './service.service';
import { ServiceAvailable } from './services.dto';

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
}
