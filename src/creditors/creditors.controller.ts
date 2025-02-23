import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreditorsService } from './creditors.service';
import { Creditor } from './entities/creditor.entity';

@Controller('creditors')
export class CreditorsController {
  constructor(private readonly creditorsService: CreditorsService) {}

  @Post()
  create(@Body() data: Partial<Creditor>) {
    return this.creditorsService.create(data);
  }

  @Get()
  findAll() {
    return this.creditorsService.findAll();
  }

  @Post('login')
  signIn(@Body() { email, password }: { email: string; password: string }) {
    return this.creditorsService.signIn(email, password);
  }

  @Post('reset-password')
  resetPassword(@Body() { email }: { email: string }) {
    return this.creditorsService.resetPassword(email);
  }

  @Post('refresh_token')
  refreshToken(@Body() { refresh_token }: { refresh_token: string }) {
    return this.creditorsService.refreshToken(refresh_token);
  }
}
