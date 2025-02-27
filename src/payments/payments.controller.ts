import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Payment } from './entities/payment.entitie';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() paymentData: Partial<Payment>) {
    return this.paymentsService.create(paymentData);
  }

  @Get('/:creditor_id')
  findAll(@Param('creditor_id') creditor_id: string) {
    return this.paymentsService.findAll(creditor_id);
  }

  @Get('/:id/creditor_id/:creditor_id')
  findOne(@Param('id') id: string, @Param('creditor_id') creditor_id: string) {
    return this.paymentsService.findOne(id, creditor_id);
  }

  @Patch('/:id/creditor_id/:creditor_id')
  update(
    @Param('id') id: string,
    @Param('creditor_id') creditor_id: string,
    @Body() paymentData: any,
  ) {
    return this.paymentsService.update(id, paymentData, creditor_id);
  }

  @Delete('/:id/creditor_id/:creditor_id')
  remove(@Param('id') id: string, @Param('creditor_id') creditor_id: string) {
    return this.paymentsService.remove(id, creditor_id);
  }
}
