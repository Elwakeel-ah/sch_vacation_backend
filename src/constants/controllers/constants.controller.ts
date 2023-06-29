import { Controller, Get } from '@nestjs/common';
import { VacationBalance } from 'src/shared/enums/vacation-balance.enum';
import { response } from 'src/shared/utils/response';

@Controller('cts')
export class ConstantsController {
  @Get('annual')
  getAnnualTotalBalance() {
    return response(
      true,
      ['annual balance fetched successfully'],
      [VacationBalance.AnnualTotalBalance],
    );
  }

  @Get('sick')
  getSickTotalBalance() {
    return response(
      true,
      ['annual balance fetched successfully'],
      [VacationBalance.SickTotalBalance],
    );
  }
}
