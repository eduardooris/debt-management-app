import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreditorsRepository } from './creditors.repository';
import { Creditor } from './entities/creditor.entity';
import { supabase } from 'src/supabase/supabase.client';

@Injectable()
export class CreditorsService {
  constructor(private readonly creditorsRepository: CreditorsRepository) {}

  async create(data: Partial<Creditor>): Promise<Creditor> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email ?? '',
      password: data.password ?? '',
    });
    if (authError) throw new Error(authError.message);
    return this.creditorsRepository.create({
      ...data,
      auth_id: authData.user?.id,
    });
  }

  async getDataCreditor(
    accessToken: string,
  ): Promise<Omit<Creditor, 'password'>> {
    const user = await this.creditorsRepository.findByAccessToken(accessToken);
    return this.creditorsRepository.findByAuthId(user.id);
  }

  findAll(): Promise<Creditor[]> {
    return this.creditorsRepository.findAll();
  }

  async signIn(email: string, password: string) {
    const { user, access_token, refresh_token } =
      await this.creditorsRepository.signIn(email, password);
    const creditor = await this.creditorsRepository.findByAuthId(user.id);
    return {
      creditor,
      access_token,
      refresh_token,
    };
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return { message: 'Password reset email sent' };
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    console.log(data)
    if (error || !data.session) {
      throw new UnauthorizedException('Failed to refresh token');
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }
}
