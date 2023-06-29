import { BadRequestException, Injectable } from '@nestjs/common';
import { VacationsRepository } from '../repositories/vacations.repository';
import { VacationRequestDto } from '../dtos/vacation-request.dto';
import { VacationsUtility } from '../utility/vacations.utility';
import { response } from 'src/shared/utils/response';

@Injectable()
export class VacationsService {
  constructor(
    private readonly vacationRepo: VacationsRepository,
    private readonly vacationsUtility: VacationsUtility,
  ) {}

  async createVacation(vacationRequestDto: VacationRequestDto) {
    const { startDate: start, endDate: end, vacationType } = vacationRequestDto;

    //create date objects from dateIsoString.
    const startDate = new Date(start);
    const endDate = new Date(end);

    //check if the date interval is valid.
    const isValidDateInterval = this.vacationsUtility.checkDateInterval(
      startDate,
      endDate,
    );

    //throw an error if date interval is invalid.
    if (!isValidDateInterval)
      throw new BadRequestException('invalid date interval');

    //calculate vacation days requested by the employee.
    const requestedDays = this.vacationsUtility.calculateVacations(
      startDate,
      endDate,
    );

    if (requestedDays == 0) {
      throw new BadRequestException('This is already weekend');
    }

    //get all previous vacations.
    const allUsedVacations = await this.vacationRepo.findAll();

    //get all previous vacations for annual or sick to check balance.
    const allUsedVacationsByType = allUsedVacations.filter(
      (elem) => elem.vacationType == vacationType,
    );

    //get all previous vacations days.
    const allUsedDays = this.vacationsUtility.calculateHistoryVacations(
      allUsedVacationsByType,
    );

    //check if the new requested  days exceeding the remaining balance.
    const isExceedingBalance = this.vacationsUtility.checkExceedingBalance(
      requestedDays,
      allUsedDays,
      vacationType,
    );

    //throw an error if the requested days exceeds the remaining balance.
    if (!isExceedingBalance) {
      throw new BadRequestException('Exceeding your vacation balance');
    }

    const isVacationOverlap = this.vacationsUtility.checkVacationOverlap(
      allUsedVacations,
      startDate,
      endDate,
    );

    //throw an error if the requested days overlaps with others.
    if (isVacationOverlap) {
      throw new BadRequestException('Vacation Day is Already taken before');
    }

    // if not create a new vacation.
    await this.vacationRepo.InsertOne(startDate, endDate, vacationType);

    return response(true, ['vacation request created successfully'], []);
  }

  async getAllVacations() {
    const allVacations = await this.vacationRepo.findAll();
    return response(
      true,
      ['vacations records fetched successfully'],
      allVacations,
    );
  }
}
