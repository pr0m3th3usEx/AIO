import { Service, ServiceType } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FRONT_END_URL, REDDIT_APP_ID } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WidgetConfiguration } from 'src/widget/widget.dto';
import { WidgetService } from 'src/widget/widget.service';
import {
  ServiceAvailable,
  ServiceConfiguration,
  ServiceURLResponse,
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
    const existing = await this.prisma.service.findFirst({
      where: {
        user_id,
        type: dto.serviceType,
      },
    });

    if (dto.id && dto.id !== existing.id) {
      throw new BadRequestException('Service not related to this user');
    }

    return this.prisma.service.upsert({
      where: {
        id: dto.id ?? existing?.id ?? '',
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
      reduced[service.type].id = service.id;
    });

    return Object.values(reduced);
  }

  async getWidgetFromService(type: string): Promise<WidgetConfiguration[]> {
    const selectedService = (<ServiceConfiguration[]>AVAILABLE_SERVICES).find(
      (s) => s.name === type,
    );

    if (!selectedService) {
      throw new NotFoundException('Service does not exist');
    }
    return selectedService.widgets;
  }

  getServiceParametersURL(service: ServiceType, url: string): string {
    if (service === 'REDDIT') {
      return `${url}?client_id=${REDDIT_APP_ID}&response_type=code&state=random&redirect_uri=${FRONT_END_URL}/oauth_callback&duration=permanent&scope=read`;
    }
    if (service === 'TWITTER') {
      return url;
    }
    return '';
  }

  async getServiceUrl(service: ServiceType): Promise<ServiceURLResponse> {
    const selectedService = (<ServiceConfiguration[]>AVAILABLE_SERVICES).find(
      (s) => s.name === service,
    );

    if (!selectedService) {
      throw new NotFoundException('Service does not exist');
    }

    const authorization_url = this.getServiceParametersURL(
      service,
      selectedService.authorization_url,
    );

    return {
      authorize_url: authorization_url,
    };
  }
}
