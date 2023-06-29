import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VacationsModule } from './vacations/vacations.module';
import { ConstantsModule } from './constants/constants.module';

@Module({
  imports: [ConfigModule.forRoot(), VacationsModule, ConstantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
