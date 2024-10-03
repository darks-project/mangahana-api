import { Module } from '@nestjs/common';
import { AuthorizationController } from './controller';
import { AuthorizationService } from './service';
import { SMS } from 'common/sms/sms.service';
import { DbModule } from 'common/database/database.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, SMS],
  imports: [DbModule],
})
export class AuthorizationModule {}