import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { Creditor } from './entities/creditor.entity';

@Injectable()
export class CreditorsRepository {
  async create(data: Partial<Creditor>): Promise<Creditor> {
    const { data: creditor, error } = await supabase
      .from('creditors')
      .insert(data)
      .single();

    if (error) throw new Error(error.message);
    return creditor as Creditor;
  }

  async findAll(): Promise<Creditor[]> {
    const { data, error } = await supabase.from('creditors').select('*');
    if (error) throw new Error(error.message);
    return data as Creditor[];
  }
}
