import { Body, Controller, Get, Post } from '@nestjs/common';
import { VacationRequestDto } from '../dtos/vacation-request.dto';
import { VacationsService } from '../services/vacations.service';

@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationService: VacationsService) {}

  @Get()
  getAllVacations() {
    return this.vacationService.getAllVacations();
  }

  @Post()
  createVacation(@Body() vacationRequestDto: VacationRequestDto) {
    return this.vacationService.createVacation(vacationRequestDto);
  }
}
