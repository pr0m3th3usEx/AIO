import { Service, ServiceType } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WidgetService } from 'src/widget/widget.service';
import {
  ServiceAvailable,
  ServiceConfiguration,
  UpsertServiceDto,
} from './services.dto';
import AVAILABLE_SERVICES from './services.json';

@Injectable()
export class ServiceProvider {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private widgetService: WidgetService,
  ) {}

  async upsertService(
    user_id: string,
    dto: UpsertServiceDto,
  ): Promise<Service> {
    const selectedService = (<ServiceConfiguration[]>AVAILABLE_SERVICES).filter(
      (s) => s.name === dto.serviceType,
    );
    if (selectedService.length !== 1) {
      throw new BadRequestException('Unknown service');
    }

    return this.prisma.service.upsert({
      where: {
        id: dto.id ?? "",
      },
      update: {
        is_activated: dto.activated,
        access_token: dto.accessToken,
        refresh_token: dto.refreshToken,
      },
      create: {
        type: dto.serviceType,
        is_activated: dto.activated,
        access_token: dto.accessToken,
        refresh_token: dto.refreshToken,
        oauth2: selectedService[0].oauth2,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  async getServicesAvailable(user_id: string): Promise<ServiceAvailable[]> {
    const existingServices = (<ServiceConfiguration[]>AVAILABLE_SERVICES).map(
      (service) => {
        const { name, oauth2, ..._ } = service;
        return { name, data: { name, oauth2, isActivated: false } };
      },
    );

    const reduced = existingServices.reduce(
      (acc, service) => ({ ...acc, [service.name]: service.data }),
      {},
    );
    const services = await this.prisma.service.findMany({
      where: { user_id },
    });
    services.forEach((service) => {
      reduced[service.type].isActivated = service.is_activated;
    });

    return Object.values(reduced);
  }
}
