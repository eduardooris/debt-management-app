import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase.client';
import { PaymentsRepository } from './payments.repository';
import { Payment } from './entities/payment.entitie';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}
  async create(paymentData: Partial<Payment>) {
    return this.paymentsRepository.create(paymentData);
  }

  async findAll(userId: string) {
    return this.paymentsRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return this.paymentsRepository.findOne(id, userId);
  }

  async update(id: string, paymentData: Partial<Payment>, userId: string) {
    return this.paymentsRepository.update(id, paymentData, userId);
  }

  async remove(id: string, userId: string) {
    return this.paymentsRepository.remove(id, userId);
  }
}
