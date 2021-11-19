import { Widget } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateWidgetDto } from './widget.dto';

@Injectable()
export class WidgetService {
  constructor(private prisma: PrismaService, userService: UserService) {}

  async createWidget(dto: CreateWidgetDto): Promise<Widget | string> {
    return 'create widget';
  }
}
