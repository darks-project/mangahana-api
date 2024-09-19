import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { DbModule } from 'common/database/database.module';
import { SmsModule } from 'common/sms/sms.module';
import { SMS } from 'common/sms/sms.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbModule, SMS],
  imports: [DbModule, SmsModule]
})
export class UsersModule {}
