import { Injectable } from '@nestjs/common';
import { LoansRepository } from './loans.repository';
import { Loan } from './entities/loan.entitie';

@Injectable()
export class LoansService {
  constructor(private readonly loansRepository: LoansRepository) {}

  create(data: Partial<Loan>, creditor_id: string): Promise<Loan[]> {
    return this.loansRepository.create(data, creditor_id);
  }

  findAll(userId: string) {
    return this.loansRepository.findAll(userId);
  }

  findOne(id: string, userId: string): Promise<Loan[]> {
    return this.loansRepository.findOne(id, userId);
  }

  update(id: string, loanData: Partial<Loan>, userId: string) {
    return this.loansRepository.update(id, loanData, userId);
  }

  remove(id: string, userId: string) {
    return this.loansRepository.remove(id, userId);
  }
}
