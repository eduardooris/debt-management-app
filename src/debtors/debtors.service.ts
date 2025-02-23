import { Injectable } from '@nestjs/common';
import { DebtorsRepository } from './debtors.repository';
import { Debtor } from './entities/debtor.entitie';

@Injectable()
export class DebtorsService {
  constructor(private readonly debtorsRepository: DebtorsRepository) {}

  create(data: Partial<Debtor>): Promise<Debtor> {
    return this.debtorsRepository.create(data);
  }

  findAll(): Promise<Debtor[]> {
    return this.debtorsRepository.findAll();
  }

  getDebtorsByCreditor(creditorId: string): Promise<Debtor[]> {
    return this.debtorsRepository.getDebtorsByCreditor(creditorId);
  }
}
