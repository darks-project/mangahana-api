import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './service';

import { DbModule } from 'common/database/database.module';
import { SmsModule } from 'common/sms/sms.module';
import { SMS } from 'common/sms/sms.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SMS],
  imports: [DbModule],
})
export class UsersModule {}
