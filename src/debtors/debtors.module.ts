import { Module } from '@nestjs/common';
import { DebtorsController } from './debtors.controller';
import { DebtorsService } from './debtors.service';
import { DebtorsRepository } from './debtors.repository';

@Module({
  controllers: [DebtorsController],
  providers: [DebtorsService, DebtorsRepository]
})
export class DebtorsModule {}
