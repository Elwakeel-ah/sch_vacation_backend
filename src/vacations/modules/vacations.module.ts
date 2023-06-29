import { Module } from '@nestjs/common';
import { VacationsController } from '../controllers/vacations.controller';
import { VacationsService } from '../services/vacations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeVacation } from '../entities/employee-vacation.entity';
import { VacationsRepository } from '../repositories/vacations.repository';
import { VacationsUtility } from '../utility/vacations.utility';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeVacation])],
  controllers: [VacationsController],
  providers: [VacationsService, VacationsRepository, VacationsUtility],
})
export class VacationsModule {}
