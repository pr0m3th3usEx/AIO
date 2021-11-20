import { ServiceType } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WidgetService } from 'src/widget/widget.service';
import { ServiceAvailable, ServiceConfiguration } from './services.dto';
import AVAILABLE_SERVICES from './services.json';

@Injectable()
export class ServiceProvider {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private widgetService: WidgetService,
  ) {}

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
