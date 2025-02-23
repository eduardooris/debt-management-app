import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DebtorsService } from './debtors.service';
import { Debtor } from './entities/debtor.entitie';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('debtors')
@UseGuards(AuthGuard)
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @Post()
  create(@Body() data: Partial<Debtor>) {
    return this.debtorsService.create(data);
  }

  @Get('/all')
  findAll() {
    return this.debtorsService.findAll();
  }

  @Get('/:creditorId')
  getDebtorsByCreditor(@Param('creditorId') creditorId: string) {
    return this.debtorsService.getDebtorsByCreditor(creditorId);
  }
}
