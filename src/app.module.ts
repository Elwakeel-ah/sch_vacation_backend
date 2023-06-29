import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VacationsModule } from './vacations/modules/vacations.module';
import { ConstantsModule } from './constants/constants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeVacation } from './vacations/entities/employee-vacation.entity';

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
  providers: [AppService],
})
export class AppModule {}
