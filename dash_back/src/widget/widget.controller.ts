import { Widget } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { CleanedUser } from 'src/user/user.dto';
import { UserDec } from 'src/utils/user.decorator';
import { CreateWidgetDto, UpdateWidgetParameterDto } from './widget.dto';
import { WidgetService } from './widget.service';

@Controller('api/widgets')
export class WidgetController {
  constructor(private widgetService: WidgetService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(201)
  async createWidget(
    @UserDec() user: CleanedUser,
    @Body() body: CreateWidgetDto,
  ): Promise<Widget> {
    return this.widgetService.createWidget(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllWidgets(
    @UserDec() user: CleanedUser,
  ): Promise<Widget[] | string> {
    return this.widgetService.getAllUserWidgets(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getWidgetInfo(@Param('id') widgetId: string): Promise<Widget> {
    return this.widgetService.getWidgetDetails(widgetId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteWidget(@Param('id') widgetId: string): Promise<boolean> {
    return this.widgetService.destroyWidget(widgetId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateWidget(
    @UserDec() user: CleanedUser,
    @Param('id') widgetId: string,
    @Body() parameters: UpdateWidgetParameterDto,
  ): Promise<Widget | string> {
    return this.widgetService.updateWidget(widgetId, parameters);
  }
}
