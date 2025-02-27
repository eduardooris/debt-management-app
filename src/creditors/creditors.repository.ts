import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async findByAccessToken(accessToken: string) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
    return data.user;
  }

  async findByAuthId(authId: string): Promise<Omit<Creditor, 'password'>> {
    const { data, error } = await supabase
      .from('creditors')
      .select('id, name, email, auth_id')
      .eq('auth_id', authId)
      .single();

    if (error) throw new Error(error.message);
    return data as Omit<Creditor, 'password'>;
  }

  async findAll(): Promise<Creditor[]> {
    const { data, error } = await supabase.from('creditors').select('*');
    if (error) throw new Error(error.message);
    return data as Creditor[];
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data.session;
  }
}
