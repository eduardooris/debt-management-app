import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase.client';
import { Payment } from './entities/payment.entitie';

@Injectable()
export class PaymentsRepository {
  async create(paymentData: Partial<Payment>) {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          ...paymentData,
          created_at: new Date(),
          payment_date: new Date(),
        },
      ])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll(userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('creditor_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .eq('creditor_id', userId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Pagamento não encontrado');
    return data;
  }

  async update(id: string, paymentData: Partial<Payment>, userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .update(paymentData)
      .eq('id', id)
      .eq('creditor_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Pagamento não encontrado');
    return data;
  }

  async remove(id: string, userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id)
      .eq('creditor_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('Pagamento não encontrado');
    return { message: 'Pagamento removido com sucesso' };
  }
}
