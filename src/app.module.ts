import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
   controllers: [AppController],
   providers: [AppService],
   imports: [
      UsersModule,
      AuthModule,
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: '.env',
      }),
      TypeOrmModule.forRoot(),

   ],
})
export class AppModule {}