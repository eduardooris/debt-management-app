import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase.client';
import { Loan } from './entities/loan.entitie';

@Injectable()
export class LoansRepository {
  async create(loanData: Partial<Loan>, creditor_id: string): Promise<Loan[]> {
    const { data: loan, error } = await supabase
      .from('loans')
      .insert([{ ...loanData, creditor_id }])
      .select();

    if (error) throw new Error(error.message);
    return loan;
  }

  async findAll(userId: string): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('creditor_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string, userId: string): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('id', id)
      .eq('creditor_id', userId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Empréstimo não encontrado');
    return data;
  }

  async update(
    id: string,
    loanData: Partial<Loan>,
    userId: string,
  ): Promise<Loan[]> {
    const { data, error } = await supabase
      .from('loans')
      .update(loanData)
      .eq('id', id)
      .eq('creditor_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Empréstimo não encontrado');
    return data;
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const { data, error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id)
      .eq('creditor_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Empréstimo não encontrado');
    return { message: 'Empréstimo removido com sucesso' };
  }
}
