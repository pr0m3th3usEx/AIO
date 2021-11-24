import {
  ParameterType,
  Prisma,
  ServiceType,
  Widget,
  WidgetType,
} from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceConfiguration } from 'src/services/services.dto';
import { CleanedUser } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { UserDec } from 'src/utils/user.decorator';
import {
  CreateWidgetDto,
  UpdateWidgetParameterDto,
  WidgetConfiguration,
  WidgetParameterConfiguration,
  WidgetParameterDto,
} from './widget.dto';
import AVAILABLE_SERVICES from 'src/services/services.json';

@Injectable()
export class WidgetService {
  private timer: number = 0;

  constructor(private prisma: PrismaService, userService: UserService) {}

  @Interval(1000)
  increaseTimer() {
    this.timer += 1;
  }

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
          (validParam) =>
            validParam !== null && validParam?.name === param?.name,
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

  async createWidget(user_id: string, dto: CreateWidgetDto): Promise<Widget> {
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

  async getAllUserWidgets(user_id: string): Promise<Widget[]> {
    return await this.prisma.widget.findMany({
      where: {
        user_id,
      },
      include: {
        parameters: true,
      },
    });
  }

  async getWidgetDetails(widget_id: string): Promise<Widget> {
    try {
      return await this.prisma.widget.findUnique({
        where: {
          id: widget_id,
        },
        include: {
          parameters: true,
        },
      });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async destroyWidget(widget_id: string): Promise<boolean> {
    try {
      const deleteWidget = this.prisma.widget.delete({
        where: {
          id: widget_id,
        },
      });

      const deleteWidgetParameters = this.prisma.widgetParameter.deleteMany({
        where: {
          widget_id: widget_id,
        },
      });

      const transaction = await this.prisma.$transaction([
        deleteWidget,
        deleteWidgetParameters,
      ]);

      return true;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updateWidget(
    widget_id: string,
    params: UpdateWidgetParameterDto,
  ): Promise<Widget> {
    try {
      const widget = await this.prisma.widget.findUnique({
        where: { id: widget_id },
        include: {
          service: true,
        },
      });

      await this.prisma.widgetParameter.deleteMany({
        where: {
          widget_id,
        },
      });
      const widgetParameter = this.isWidgetRelatedToService(
        widget.service.type,
        widget.type,
      );

      if (!this.areValidParams(params.parameters, widgetParameter.params)) {
        throw new BadRequestException('Invalid parameters');
      }

      await this.prisma.widgetParameter.createMany({
        data: params.parameters.map((param) => {
          const paramType =
            typeof param.value === 'number'
              ? ParameterType.INTEGER
              : ParameterType.STRING;
          const payload = { widget_id, type: paramType };

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
      });

      return await this.prisma.widget.findUnique({
        where: { id: widget_id },
        include: {
          parameters: true,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Widget not found');
      }
    }
  }
}
