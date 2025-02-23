import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Loan } from './entities/loan.entitie';

@Controller('loans')
@UseGuards(AuthGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('/:creditor_id')
  create(
    @Body() loanData: Partial<Loan>,
    @Param('creditor_id') creditor_id: string,
  ) {
    return this.loansService.create(loanData, creditor_id);
  }

  @Get('/:id')
  findAll(@Param('id') id: string) {
    return this.loansService.findAll(id);
  }

  @Get('/:id/creditorId/:creditorId')
  findOne(@Param('id') id: string, @Param('creditorId') creditorId: string) {
    return this.loansService.findOne(id, creditorId);
  }

  @Patch('/:id/creditorId/:creditorId')
  update(
    @Param('id') id: string,
    @Body() loanData: Partial<Loan>,
    @Param('creditorId') creditorId: string,
  ) {
    return this.loansService.update(id, loanData, creditorId);
  }

  @Delete('/:id/creditorId/:creditorId')
  remove(@Param('id') id: string, @Param('creditorId') creditorId: string) {
    return this.loansService.remove(id, creditorId);
  }
}
