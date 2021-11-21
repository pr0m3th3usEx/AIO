import {
  ParameterType,
  Prisma,
  ServiceType,
  Widget,
  WidgetType,
} from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceConfiguration } from 'src/services/services.dto';
import { CleanedUser } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { UserDec } from 'src/utils/user.decorator';
import {
  CreateWidgetDto,
  WidgetConfiguration,
  WidgetParameterConfiguration,
  WidgetParameterDto,
} from './widget.dto';
import AVAILABLE_SERVICES from 'src/services/services.json';

@Injectable()
export class WidgetService {
  constructor(private prisma: PrismaService, userService: UserService) {}

  private isWidgetRelatedToService(
    serviceType: ServiceType,
    widgetType: WidgetType,
  ): WidgetConfiguration {
    const service = (<ServiceConfiguration[]>AVAILABLE_SERVICES).filter(
      (service) => {
        return service.name === serviceType;
      },
    );
    if (service.length === 0) {
      throw new BadRequestException('Service is not available');
    }
    const widget = service[0].widgets.find(
      (widget) => widget.type === widgetType,
    );

    if (!widget) {
      throw new BadRequestException('Widget is not related to this service');
    }
    return widget;
  }

  private areValidParams(
    paramsGiven: WidgetParameterDto[],
    pattern: WidgetParameterConfiguration[],
  ): boolean {
    if (paramsGiven.length !== pattern.length) {
      return false;
    }

    return (
      paramsGiven.filter((param) => {
        const paramChecker = pattern.find(
          (validParam) => validParam.name === param.name,
        );

        if (!paramChecker) {
          return false;
        }
        const paramType =
          typeof param.value === 'number'
            ? 'integer'
            : typeof param.value === 'string'
            ? 'string'
            : undefined;
        return paramChecker.type === paramType;
      }).length === pattern.length
    );
  }

  async createWidget(
    user_id: string,
    dto: CreateWidgetDto,
  ): Promise<Widget | string> {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          id: dto.service_id,
        },
      });

      if (!service || !service.is_activated || service.user_id !== user_id) {
        throw new BadRequestException('Service is not activated');
      }
      const widgetConfiguration = this.isWidgetRelatedToService(
        service.type,
        dto.type,
      );

      if (!this.areValidParams(dto.parameters, widgetConfiguration.params)) {
        throw new BadRequestException('Invalid parameters');
      }

      const widget = this.prisma.widget.create({
        data: {
          type: dto.type,
          refresh_rate: dto.refresh_rate,
          service: {
            connect: { id: service.id },
          },
          user: {
            connect: { id: user_id },
          },

          parameters: {
            create: dto.parameters.map((param) => {
              const paramType =
                typeof param.value === 'number'
                  ? ParameterType.INTEGER
                  : ParameterType.STRING;
              const payload = { type: paramType };

              if (paramType === ParameterType.INTEGER) {
                return {
                  name: param.name,
                  value_int: param.value as number,
                  ...payload,
                };
              } else {
                return {
                  name: param.name,
                  value_string: param.value as string,
                  ...payload,
                };
              }
            }),
          },
        },
        include: {
          parameters: true,
        },
      });

      return widget;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Service is not activated');
      }
      throw err;
    }
  }
}
