import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VacationsModule } from './vacations/modules/vacations.module';
import { ConstantsModule } from './constants/modules/constants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeVacation } from './vacations/entities/employee-vacation.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception-filter/filter.exception';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'vacations',
      entities: [EmployeeVacation],
      synchronize: true,
    }),
    VacationsModule,
    ConstantsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
