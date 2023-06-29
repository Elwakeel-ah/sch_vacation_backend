import { Module } from '@nestjs/common';
import { ConstantsController } from '../controllers/constants.controller';

@Module({
  controllers: [ConstantsController],
  providers: [],
})
export class ConstantsModule {}
