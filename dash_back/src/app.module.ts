import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './services/service.module';
import { UserModule } from './user/user.module';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [AuthModule, UserModule, WidgetModule, ServiceModule],
})
export class AppModule {}
