import { Injectable } from '@nestjs/common';
import { EmployeeVacation } from '../entities/employee-vacation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { vacationEnum } from '../enums/vacation-type.enum';

@Injectable()
export class VacationsRepository {
  constructor(
    @InjectRepository(EmployeeVacation)
    private vacationsRepository: Repository<EmployeeVacation>,
  ) {}

  async findVacationsByType(vacationType: vacationEnum) {
    return this.vacationsRepository.find({
      where: {
        vacationType: vacationType,
      },
    });
  }

  async findAll() {
    return this.vacationsRepository.find();
  }

  async InsertOne(startDate: Date, endDate: Date, vacationType: vacationEnum) {
    const newVacation = await this.vacationsRepository.insert({
      startDate,
      endDate,
      vacationType,
    });
    return newVacation;
  }
}
