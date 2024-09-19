import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from 'common/database/database.module';
import { SmsModule } from 'common/sms/sms.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  providers: [] 
})
export class AppModule {}