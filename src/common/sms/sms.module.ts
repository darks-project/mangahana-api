import { Module } from '@nestjs/common';
import { SMS } from './sms.service';

@Module({
  providers: [SMS]
})
export class SmsModule {}