import { Injectable } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase.client';
import { Debtor } from './entities/debtor.entitie';

@Injectable()
export class DebtorsRepository {
  async create(data: Partial<Debtor>): Promise<Debtor> {
    const { data: debtor, error } = await supabase
      .from('debtors')
      .insert(data)
      .single();

    if (error) throw new Error(error.message);
    return debtor as Debtor;
  }

  async findAll(): Promise<Debtor[]> {
    const { data, error } = await supabase.from('debtors').select('*');
    if (error) throw new Error(error.message);

    return data as Debtor[];
  }

  async getDebtorsByCreditor(creditorId: string) {
    const { data, error } = await supabase
    .from('debtors')
    .select(`
      *,
      loans (
        amount,
        due_date,
        status,
        payments (amount_paid)
      )
    `)
    .eq('creditor_id', creditorId);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
