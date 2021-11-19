import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WidgetService } from 'src/widget/widget.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private widgetService: WidgetService,
  ) {}
}
