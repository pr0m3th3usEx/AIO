import { Widget } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServicesService } from 'src/services/service.service';
import { CleanedUser } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { UserDec } from 'src/utils/user.decorator';
import { CreateWidgetDto } from './widget.dto';

@Injectable()
export class WidgetService {
  constructor(
    private prisma: PrismaService,
    userService: UserService,
    services: ServicesService,
  ) {}

  async createWidget(
    userId: string,
    dto: CreateWidgetDto,
  ): Promise<Widget | string> {
    // check services activated
    // check if this service have this type of widget
    //
    // try {
    //   const service = await this.prisma.service.findUnique({
    //     where : {
    //       id: service.
    //     }
    //   })
    // } catch (err) {

    // }
    return 'create widget';
  }
}
