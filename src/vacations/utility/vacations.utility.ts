import { Injectable } from '@nestjs/common';
import { EmployeeVacation } from '../entities/employee-vacation.entity';
import { vacationEnum } from '../enums/vacation-type.enum';
import { VacationBalance } from 'src/shared/enums/vacation-balance.enum';

@Injectable()
export class VacationsUtility {
  checkDateInterval(startDate: Date, endDate: Date) {
    if (startDate > endDate) return false;
    return true;
  }

  calculateVacations(startDate: Date, endDate: Date) {
    //calculate the total time difference.
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    //calculate the total days.
    const totalDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000)) + 1;

    // calculate the weekends to be excluded.
    const weekends = this.calculateWeekends(startDate, endDate);

    // calculate the vacations day.
    const vacationDays = totalDays - weekends;
    return vacationDays;
  }

  calculateWeekends(start: Date, end: Date) {
    let weekends = 0;
    let current = start;
    while (current <= end) {
      const dayOfWeek = current.getDay();
      //check if the day is a weekend Friday or saturday.
      if (dayOfWeek == 5 || dayOfWeek == 6) weekends++;
      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }
    return weekends;
  }

  //calculate all vacation days from all previous requests.
  calculateHistoryVacations(employeeVacations: EmployeeVacation[]) {
    let allPreviousVacations = 0;
    for (let i = 0; i < employeeVacations.length; i++) {
      const startDate = new Date(employeeVacations[i]?.startDate);
      const endDate = new Date(employeeVacations[i]?.endDate);
      const intervalVacations = this.calculateVacations(startDate, endDate);
      allPreviousVacations += intervalVacations;
    }
    return allPreviousVacations;
  }

  checkExceedingBalance(
    requestedDays: number,
    allUsedDays: number,
    vacationType: vacationEnum,
  ) {
    switch (vacationType) {
      case 'annual':
        return (
          requestedDays + allUsedDays <= VacationBalance.AnnualTotalBalance
        );
      case 'sick':
        return requestedDays + allUsedDays <= VacationBalance.SickTotalBalance;
      default:
        return false;
    }
  }

  checkVacationOverlap(
    employeeVacations: EmployeeVacation[],
    startDate: Date,
    endDate: Date,
  ) {
    let overlap = false;
    for (const vacation of employeeVacations) {
      if (
        (startDate < vacation.startDate && endDate < vacation.endDate) ||
        startDate > vacation.endDate
      ) {
        continue;
      } else {
        overlap = true;
      }
    }
    return overlap;
  }
}
