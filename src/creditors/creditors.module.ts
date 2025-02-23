import { Module } from '@nestjs/common';
import { CreditorsService } from './creditors.service';
import { CreditorsController } from './creditors.controller';
import { CreditorsRepository } from './creditors.repository';

@Module({
    providers: [CreditorsService, CreditorsRepository],
    controllers: [CreditorsController],
})
export class CreditorsModule {}
