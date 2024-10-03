import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthorizationModule } from 'authorization/module';
import { UsersModule } from 'users/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthorizationModule,
    UsersModule,
  ],
  providers: [] 
})
export class AppModule {}