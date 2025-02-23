import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditorsModule } from './creditors/creditors.module';
import { DebtorsModule } from './debtors/debtors.module';
import { LoansModule } from './loans/loans.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [
    CreditorsModule,
    DebtorsModule,
    LoansModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
