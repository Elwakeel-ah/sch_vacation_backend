import { IsDateString, IsEnum } from 'class-validator';
import { vacationEnum } from '../enums/vacation-type.enum';

export class VacationRequestDto {
  @IsEnum(vacationEnum)
  vacationType: vacationEnum;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
