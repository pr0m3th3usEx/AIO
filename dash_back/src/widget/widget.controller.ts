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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { text } from 'express';
import { Translated } from 'src/apis/translate.service';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { CleanedUser } from 'src/user/user.dto';
import { UserDec } from 'src/utils/user.decorator';
import { CreateWidgetDto, UpdateWidgetParameterDto } from './widget.dto';
import { WidgetService } from './widget.service';

@ApiTags('widgets')
@Controller('api/widgets')
export class WidgetController {
  constructor(private widgetService: WidgetService) {}

  @ApiResponse({ status: 201, description: 'The widget has been created' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(201)
  async createWidget(
    @UserDec() user: CleanedUser,
    @Body() body: CreateWidgetDto,
  ): Promise<Widget> {
    return this.widgetService.createWidget(user.id, body);
  }

  @ApiResponse({ status: 200, description: 'Return all user widgets' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllWidgets(
    @UserDec() user: CleanedUser,
  ): Promise<Widget[] | string> {
    return this.widgetService.getAllUserWidgets(user.id);
  }

  @ApiResponse({ status: 200, description: 'Widget information' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getWidgetInfo(@Param('id') widgetId: string): Promise<Widget> {
    return this.widgetService.getWidgetDetails(widgetId);
  }

  @ApiResponse({
    status: 200,
    description: 'The widget has been successfully removed',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteWidget(@Param('id') widgetId: string): Promise<boolean> {
    return this.widgetService.destroyWidget(widgetId);
  }

  @ApiResponse({
    status: 200,
    description: 'The widget has been successfully updated',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateWidget(
    @UserDec() user: CleanedUser,
    @Param('id') widgetId: string,
    @Body() parameters: UpdateWidgetParameterDto,
  ): Promise<Widget | string> {
    return this.widgetService.updateWidget(widgetId, parameters);
  }

  @ApiResponse({ status: 200, description: 'New widget refreshed data' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/:id/refresh')
  async refreshWidget(@Param('id') widgetId: string): Promise<any> {
    return this.widgetService.refreshWidget(widgetId);
  }

  @ApiResponse({
    status: 200,
    description: 'Translation of the text passed in query',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('/:id/translation')
  async translate(
    @Param('id') widgetId: string,
    @Query('text') text: string,
  ): Promise<Translated> {
    return this.widgetService.translate(widgetId, text);
  }
}
