import { Service, ServiceType } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedditService } from 'src/apis/reddit/reddit.service';
import { TwitterService } from 'src/apis/twitter/twitter.service';
import { FRONT_END_URL, REDDIT_APP_ID } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WidgetConfiguration } from 'src/widget/widget.dto';
import { WidgetService } from 'src/widget/widget.service';
import {
  AuthorizationDtoUrl,
  AuthorizationTokens,
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
    private redditService: RedditService,
    private twitterService: TwitterService,
  ) {}

  async getServiceInfo(id: string): Promise<Service> {
    try {
      return this.prisma.service.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException('Service not found');
    }
  }

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

  getServiceParametersURL(service: ServiceType): string {
    if (service === 'REDDIT') {
      return this.redditService.getAuthorizationUrl();
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

    const authorization_url = this.getServiceParametersURL(service);

    return {
      authorize_url: authorization_url,
    };
  }

  async getTokens(dto: AuthorizationDtoUrl): Promise<AuthorizationTokens> {
    const query = new URLSearchParams(dto.url);

    if (dto.serviceType === 'REDDIT') {
      return this.redditService.getTokens(query);
    } else if (dto.serviceType === 'TWITTER') {
      return this.twitterService.getTokens(query);
    }

    return {
      access_token: '',
      refresh_token: '',
    };
  }
}
